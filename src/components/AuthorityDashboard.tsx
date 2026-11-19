import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Send, 
  FileSpreadsheet, 
  Building,
  CheckCircle,
  Briefcase,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { CivicReport, ReportStatus, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getGoogleMapsSearchUrl, getGoogleMapsDirectionsUrl } from '../utils/googleMapsLinks';

interface AuthorityDashboardProps {
  reports: CivicReport[];
  onAddOfficerNote: (reportId: string, note: string, newStatus?: ReportStatus) => void;
  language: SupportedLanguage;
}

export const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({
  reports,
  onAddOfficerNote,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedReportId, setSelectedReportId] = useState<string>(reports[0]?.id || '');
  const [officerNote, setOfficerNote] = useState('');
  const [targetStatus, setTargetStatus] = useState<ReportStatus>('in_progress');
  const [officerName, setOfficerName] = useState('Er. R. K. Sharma (Zonal Chief)');

  const total = reports.length;
  const submittedCount = reports.filter(r => r.status === 'submitted').length;
  const acknowledgedCount = reports.filter(r => r.status === 'acknowledged').length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
  const resolvedCount = reports.filter(r => r.status === 'resolved').length;

  const currentReport = reports.find(r => r.id === selectedReportId) || reports[0];

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerNote.trim() || !currentReport) return;

    onAddOfficerNote(currentReport.id, officerNote, targetStatus);
    setOfficerNote('');
  };

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Title', 'Department', 'Status', 'Address', 'Lodged Date', 'Urgency'];
    const rows = reports.map(r => [
      r.id,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.department.name}"`,
      r.status,
      `"${r.address.replace(/"/g, '""')}"`,
      new Date(r.createdAt).toISOString(),
      r.urgency
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `municipal_civic_reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Authority Overview Cards */}
      <div className="bg-white rounded border border-[#D8D2C5] p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#EBE7DF] pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#2F5D8A]" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#1C2B39]">
                {t.officerDashboard}
              </h2>
              <p className="text-xs text-[#6B7280]">
                Supervisory console for municipal triage officers, engineers, and crew dispatch leads.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#FAF8F5] border border-[#2F5D8A] text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Master Log (CSV)</span>
          </button>
        </div>

        {/* 4 Metric Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E5E0D6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
              {t.totalComplaints}
            </span>
            <div className="ticket-mono text-2xl font-bold text-[#1C2B39] mt-1">
              {total}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Active civic records</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E5E0D6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E2A63B]">
              {t.pendingReview}
            </span>
            <div className="ticket-mono text-2xl font-bold text-[#855B06] mt-1">
              {submittedCount}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Awaiting initial triage</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E5E0D6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D8A]">
              {t.underExecution}
            </span>
            <div className="ticket-mono text-2xl font-bold text-[#2F5D8A] mt-1">
              {inProgressCount + acknowledgedCount}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Crews actively tasked</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#E5E0D6]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F7D58]">
              {t.resolvedTotal}
            </span>
            <div className="ticket-mono text-2xl font-bold text-[#235035] mt-1">
              {resolvedCount}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Target SLA Adherence: 95.8%</p>
          </div>
        </div>
      </div>

      {/* Field Inspection & Triage Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Queue of Tickets (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded border border-[#D8D2C5] p-4 shadow-2xs space-y-3">
          <div className="border-b border-[#EBE7DF] pb-2">
            <h3 className="font-bold text-sm text-[#1C2B39] flex items-center justify-between">
              <span>Department Workload Queue</span>
              <span className="text-xs text-[#6B7280] font-normal">{reports.length} items</span>
            </h3>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {reports.map((report) => {
              const isSelected = currentReport?.id === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#2F5D8A] bg-[#2F5D8A]/5 shadow-2xs'
                      : 'border-[#EBE7DF] bg-[#FAF8F5] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="ticket-mono font-bold text-[#2F5D8A]">{report.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      report.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                      report.status === 'acknowledged' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="font-semibold text-[#1C2B39] truncate">{report.title}</p>
                  <p className="text-[#6B7280] text-[11px] truncate mt-0.5">{report.department.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Inspection Form & Action Logger (7 Cols) */}
        {currentReport && (
          <div className="lg:col-span-7 bg-white rounded border-2 border-[#1C2B39] p-5 shadow-xs space-y-5">
            <div className="border-b border-[#EBE7DF] pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                  Inspecting Grievance
                </span>
                <p className="ticket-mono text-lg font-bold text-[#2F5D8A]">
                  {currentReport.id}
                </p>
              </div>
              <span className="text-xs text-[#6B7280]">
                Urgency Level: <strong className="uppercase text-[#1C2B39]">{currentReport.urgency}</strong>
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-sm text-[#1C2B39]">{currentReport.title}</p>
              <p className="text-[#4B5563] bg-[#FAF8F5] p-3 rounded border border-[#E5E0D6] leading-relaxed">
                {currentReport.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[#6B7280] pt-1">
                <span>Location: <strong className="text-[#1C2B39]">{currentReport.address}</strong></span>
                <span>Division: <strong className="text-[#1C2B39]">{currentReport.department.name}</strong></span>
                <div className="flex items-center gap-3 ml-auto">
                  <a
                    href={getGoogleMapsSearchUrl(currentReport.latitude, currentReport.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#2F5D8A] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={getGoogleMapsDirectionsUrl(currentReport.latitude, currentReport.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#3F7D58] hover:underline"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Officer Action Log Form */}
            <form onSubmit={handlePostNote} className="space-y-4 pt-3 border-t border-[#EBE7DF]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-[#1C2B39] mb-1">
                    Officer In Charge / Signatory:
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full rounded border border-[#C5BFB3] px-2.5 py-1.5 bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1C2B39] mb-1">
                    Update Workflow Status:
                  </label>
                  <select
                    value={targetStatus}
                    onChange={(e) => setTargetStatus(e.target.value as ReportStatus)}
                    className="w-full rounded border border-[#C5BFB3] px-2.5 py-1.5 bg-[#FAF8F5] cursor-pointer"
                  >
                    <option value="acknowledged">Acknowledged (Task Assigned)</option>
                    <option value="in_progress">In Progress (Crew Dispatched)</option>
                    <option value="resolved">Resolved (Inspection Verified)</option>
                    <option value="submitted">Submitted (Reset)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1C2B39]">
                  {t.addInspectionNote} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={officerNote}
                  onChange={(e) => setOfficerNote(e.target.value)}
                  placeholder="e.g. Field Engineer inspected location at 11:30 AM. Material supply ordered under Job Slip #781. Asphalt crew scheduled for afternoon shift."
                  rows={3}
                  required
                  className="w-full rounded border border-[#C5BFB3] p-2.5 text-xs bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                disabled={!officerNote.trim()}
                className="w-full py-2.5 px-4 rounded text-xs font-bold bg-[#1C2B39] text-white hover:bg-black transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#E2A63B]" />
                <span>Save Official Inspection Record & Advance Status</span>
              </button>
            </form>

            {/* Existing Audit Trail on this ticket */}
            <div className="pt-2 border-t border-[#EBE7DF]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                Recorded Field Audit Entries:
              </span>
              <div className="space-y-2">
                {currentReport.statusHistory.map((item, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] p-2 rounded border border-[#E5E0D6] text-xs">
                    <div className="flex justify-between items-center text-[10px] text-[#6B7280]">
                      <span className="font-bold text-[#2F5D8A] uppercase">{item.status}</span>
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-[#1C2B39] mt-0.5">{item.note}</p>
                    {item.officer && (
                      <p className="text-[10px] text-[#6B7280] mt-0.5">Signed by: {item.officer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
