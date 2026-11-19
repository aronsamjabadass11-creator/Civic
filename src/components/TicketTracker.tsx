import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Printer, 
  MapPin, 
  AlertCircle, 
  Building,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { CivicReport, ReportStatus, SupportedLanguage, UserAccessibilityMode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getGoogleMapsSearchUrl } from '../utils/googleMapsLinks';
import { TicketModal } from './TicketModal';

interface TicketTrackerProps {
  reports: CivicReport[];
  onAdvanceStatus: (reportId: string) => void;
  onFocusMap: (report: CivicReport) => void;
  language: SupportedLanguage;
  accessibilityMode: UserAccessibilityMode;
}

export const TicketTracker: React.FC<TicketTrackerProps> = ({
  reports,
  onAdvanceStatus,
  onFocusMap,
  language,
  accessibilityMode,
}) => {
  const t = TRANSLATIONS[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReportStatus>('all');
  const [activeReceiptReport, setActiveReceiptReport] = useState<CivicReport | null>(null);

  const filteredReports = reports.filter((rep) => {
    const matchesSearch = 
      rep.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.department.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || rep.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#E2A63B]/20 text-[#855B06] border border-[#E2A63B]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2A63B]"></span>
            {t.submittedBadge}
          </span>
        );
      case 'acknowledged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#2F5D8A]/15 text-[#2F5D8A] border border-[#2F5D8A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F5D8A]"></span>
            {t.acknowledgedBadge}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            {t.inProgressBadge}
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#3F7D58]/20 text-[#235035] border border-[#3F7D58]/40">
            <CheckCircle2 className="w-3 h-3 text-[#3F7D58]" />
            {t.resolvedBadge}
          </span>
        );
    }
  };

  const getNextStatusLabel = (status: ReportStatus) => {
    switch (status) {
      case 'submitted': return 'Acknowledged';
      case 'acknowledged': return 'In Progress';
      case 'in_progress': return 'Resolved';
      case 'resolved': return 'Reset to Submitted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded border border-[#D8D2C5] p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EBE7DF] pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1C2B39]">
              {t.trackingTitle}
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Live records persisted in browser storage. Click "Advance Status" to test municipal workflow stages.
            </p>
          </div>

          <div className="text-xs text-[#6B7280]">
            Total Tracked: <strong className="ticket-mono text-sm text-[#1C2B39]">{reports.length}</strong> complaints
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs rounded border border-[#C5BFB3] bg-[#FAF8F5] focus:border-[#2F5D8A] focus:ring-1 focus:ring-[#2F5D8A]"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#1C2B39] text-white border-[#1C2B39]'
                  : 'bg-[#FAF8F5] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setStatusFilter('submitted')}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                statusFilter === 'submitted'
                  ? 'bg-[#E2A63B] text-black border-[#E2A63B]'
                  : 'bg-[#FAF8F5] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
              }`}
            >
              {t.filterSubmitted}
            </button>
            <button
              onClick={() => setStatusFilter('acknowledged')}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                statusFilter === 'acknowledged'
                  ? 'bg-[#2F5D8A] text-white border-[#2F5D8A]'
                  : 'bg-[#FAF8F5] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
              }`}
            >
              {t.filterAcknowledged}
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                statusFilter === 'in_progress'
                  ? 'bg-indigo-700 text-white border-indigo-700'
                  : 'bg-[#FAF8F5] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
              }`}
            >
              {t.filterInProgress}
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                statusFilter === 'resolved'
                  ? 'bg-[#3F7D58] text-white border-[#3F7D58]'
                  : 'bg-[#FAF8F5] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
              }`}
            >
              {t.filterResolved}
            </button>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded border border-[#D8D2C5] p-8 text-center text-[#6B7280]">
          <AlertCircle className="w-8 h-8 text-[#A0AEC0] mx-auto mb-2" />
          <p className="font-semibold text-sm text-[#1C2B39]">{t.noReportsFound}</p>
          <p className="text-xs mt-1">Try changing your search terms or filter selection.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded border border-[#D8D2C5] p-5 shadow-2xs hover:border-[#2F5D8A] transition-all space-y-4"
            >
              {/* Card Header: Ticket ID & Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#EBE7DF] pb-3">
                <div className="flex items-center gap-3">
                  <span className="ticket-mono text-base font-bold text-[#2F5D8A] tracking-wider px-2 py-0.5 bg-[#FAF8F5] border border-[#D8D2C5] rounded">
                    {report.id}
                  </span>
                  <span className="text-xs text-[#6B7280] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(report.createdAt).toLocaleDateString()} • {new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(report.status)}
                </div>
              </div>

              {/* Card Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                {/* Text and Location (8 cols) */}
                <div className="lg:col-span-8 space-y-2">
                  <h3 className="font-bold text-base text-[#1C2B39] leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {report.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] pt-1">
                    <span className="flex items-center gap-1 font-medium text-[#1C2B39]">
                      <Building className="w-3.5 h-3.5 text-[#2F5D8A]" />
                      <span>{report.department.name}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#6B7280]">
                      <MapPin className="w-3.5 h-3.5 text-[#E2A63B]" />
                      <span>{report.address}</span>
                    </span>
                  </div>

                  {/* Latest Timeline Note */}
                  {report.statusHistory.length > 0 && (
                    <div className="mt-2 bg-[#FAF8F5] p-2.5 rounded border border-[#E5E0D6] text-xs">
                      <span className="font-semibold text-[#1C2B39] text-[11px] uppercase tracking-wider block">
                        Latest Municipal Update:
                      </span>
                      <p className="text-[#4B5563] text-xs mt-0.5">
                        "{report.statusHistory[report.statusHistory.length - 1].note}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Proof Image & Action Bar (4 cols) */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-end gap-3 justify-between h-full">
                  {report.imageUrl ? (
                    <img
                      src={report.imageUrl}
                      alt="Incident proof"
                      className="w-full sm:w-36 lg:w-full h-28 object-cover rounded border border-[#D8D2C5]"
                    />
                  ) : (
                    <div className="w-full h-16 bg-[#FAF8F5] rounded border border-dashed border-[#D8D2C5] flex items-center justify-center text-[11px] text-[#A0AEC0]">
                      No photo attached
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="w-full flex items-center gap-2 pt-1">
                    {/* Advance Status Button for Click-Through Prototype Demo */}
                    <button
                      onClick={() => onAdvanceStatus(report.id)}
                      className="flex-1 px-2.5 py-1.5 rounded text-xs font-semibold bg-[#2F5D8A] text-white hover:bg-[#24496D] transition-colors flex items-center justify-center gap-1"
                      title="Advance to next step in civic lifecycle"
                    >
                      <RefreshCw className="w-3 h-3 text-[#E2A63B]" />
                      <span className="truncate">{t.advanceTo} {getNextStatusLabel(report.status)}</span>
                    </button>

                    {/* Print / View Receipt */}
                    <button
                      onClick={() => setActiveReceiptReport(report)}
                      className="px-2.5 py-1.5 rounded text-xs font-semibold bg-white border border-[#D8D2C5] text-[#1C2B39] hover:bg-[#F2F0EB] transition-colors flex items-center gap-1"
                      title="View Official Receipt"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#2F5D8A]" />
                      <span className="hidden sm:inline">Receipt</span>
                    </button>

                    {/* Focus Map */}
                    <button
                      onClick={() => onFocusMap(report)}
                      className="px-2 py-1.5 rounded text-xs font-semibold bg-[#FAF8F5] border border-[#D8D2C5] text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white transition-colors"
                      title="Locate on Civic Google Map"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </button>

                    {/* Direct Google Maps Link */}
                    <a
                      href={getGoogleMapsSearchUrl(report.latitude, report.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded text-xs font-semibold bg-[#FAF8F5] border border-[#D8D2C5] text-[#3F7D58] hover:bg-[#3F7D58] hover:text-white transition-colors"
                      title="Open in Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Receipt Modal */}
      {activeReceiptReport && (
        <TicketModal
          report={activeReceiptReport}
          onClose={() => setActiveReceiptReport(null)}
          language={language}
        />
      )}
    </div>
  );
};
