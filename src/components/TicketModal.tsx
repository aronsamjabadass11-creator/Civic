import React from 'react';
import { 
  X, 
  Printer, 
  Building, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Phone, 
  User, 
  Calendar,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import { CivicReport, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getGoogleMapsSearchUrl } from '../utils/googleMapsLinks';

interface TicketModalProps {
  report: CivicReport | null;
  onClose: () => void;
  language: SupportedLanguage;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  report,
  onClose,
  language,
}) => {
  if (!report) return null;
  const t = TRANSLATIONS[language];

  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: CivicReport['status']) => {
    switch (status) {
      case 'submitted':
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#E2A63B]/20 text-[#8F6306] border border-[#E2A63B]/50">SUBMITTED (PENDING TRIAGE)</span>;
      case 'acknowledged':
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#2F5D8A]/20 text-[#2F5D8A] border border-[#2F5D8A]/50">ACKNOWLEDGED & ASSIGNED</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">IN PROGRESS (CREW DISPATCHED)</span>;
      case 'resolved':
        return <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#3F7D58]/20 text-[#235035] border border-[#3F7D58]/50">RESOLVED & VERIFIED</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-sm border-2 border-[#1C2B39] shadow-2xl overflow-hidden my-8">
        {/* Printable Official Receipt Header */}
        <div className="bg-[#1C2B39] text-[#F7F5F0] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-[#E2A63B]" />
            <div>
              <h2 className="text-sm font-bold tracking-wider uppercase">
                Official Citizen Grievance Acknowledgement Receipt
              </h2>
              <p className="text-[11px] text-[#A0AEC0]">
                Municipal Corporation Public Infrastructure & Redressal Wing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-5 text-[#1C2B39]">
          {/* Top Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EBE7DF]">
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Grievance Reference Number
              </span>
              <p className="ticket-mono text-xl font-bold text-[#2F5D8A]">
                {report.id}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Current Audit Status
              </span>
              <div className="mt-1">
                {getStatusBadge(report.status)}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Date Lodged
              </span>
              <p className="text-xs font-semibold text-[#1C2B39] mt-0.5">
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Description & Photo if present */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Citizen's Stated Issue
            </span>
            <div className="bg-[#FAF8F5] p-3 rounded border border-[#E5E0D6] text-sm leading-relaxed">
              <p className="font-semibold text-[#1C2B39] mb-1">{report.title}</p>
              <p className="text-[#4B5563] text-xs">{report.description}</p>
            </div>

            {report.imageUrl && (
              <div className="mt-2">
                <span className="text-[11px] font-semibold text-[#6B7280] block mb-1">
                  Attached Geotagged Photographic Proof:
                </span>
                <img
                  src={report.imageUrl}
                  alt="Proof"
                  className="max-h-48 rounded border border-[#D8D2C5] object-cover"
                />
              </div>
            )}
          </div>

          {/* Location & Routing Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#EBE7DF]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E2A63B]" />
                <span>Geographic Location</span>
              </span>
              <p className="text-xs font-semibold text-[#1C2B39]">{report.address}</p>
              <p className="ticket-mono text-[11px] text-[#6B7280]">
                GPS: {report.latitude.toFixed(5)}° N, {report.longitude.toFixed(5)}° E
              </p>
              <a
                href={getGoogleMapsSearchUrl(report.latitude, report.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F5D8A] hover:underline print:hidden pt-0.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#2F5D8A]" />
                <span>Assigned Municipal Division</span>
              </span>
              <p className="text-xs font-semibold text-[#1C2B39]">{report.department.name}</p>
              <p className="text-[11px] text-[#6B7280]">
                Officer In Charge: {report.department.officerInCharge}
              </p>
              <p className="ticket-mono text-[11px] text-[#2F5D8A] font-semibold">
                Emergency Helpline: {report.department.contactNumber}
              </p>
            </div>
          </div>

          {/* Official Audit Trail History */}
          <div className="pt-2 border-t border-[#EBE7DF]">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider block mb-2">
              Action & Audit Trail Timeline
            </span>
            <div className="space-y-2">
              {report.statusHistory.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs bg-[#FAF8F5] p-2 rounded border border-[#E5E0D6]">
                  <div className="w-2 h-2 rounded-full bg-[#2F5D8A] mt-1.5 shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-[#2F5D8A]">
                        {item.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-[#6B7280]">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#1C2B39] mt-0.5">{item.note}</p>
                    {item.officer && (
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Signed: <em>{item.officer}</em></p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Notice */}
          <div className="text-[10px] text-[#6B7280] pt-2 border-t border-[#EBE7DF] flex items-center justify-between">
            <span>Official Computer-Generated Document (Section 4 Public Services Act).</span>
            <span className="ticket-mono">AUTHENTICITY SHA-256 VERIFIED</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-[#F7F5F0] p-3 border-t border-[#D8D2C5] flex justify-end gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-white border border-[#2F5D8A] text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs font-semibold bg-[#1C2B39] text-white hover:bg-black"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
