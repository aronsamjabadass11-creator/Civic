import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  HeartHandshake,
  CheckCircle,
  Clock
} from 'lucide-react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CivicReport, SupportedLanguage, UserAccessibilityMode, TextScale, ReportStatus } from './types';
import { INITIAL_MOCK_REPORTS } from './data/mockReports';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { ReportForm } from './components/ReportForm';
import { TicketTracker } from './components/TicketTracker';
import { CivicMap } from './components/CivicMap';
import { AuthorityDashboard } from './components/AuthorityDashboard';
import { ExportModal } from './components/ExportModal';

const STORAGE_KEY = 'civic_portal_reports_v2';
const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

export default function App() {
  // Load reports from localStorage or fallback
  const [reports, setReports] = useState<CivicReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load reports from localStorage', e);
    }
    return INITIAL_MOCK_REPORTS;
  });

  const [currentTab, setCurrentTab] = useState<'report' | 'track' | 'map' | 'officer'>('report');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [accessibilityMode, setAccessibilityMode] = useState<UserAccessibilityMode>('standard');
  const [textScale, setTextScale] = useState<TextScale>('normal');
  const [focusedReport, setFocusedReport] = useState<CivicReport | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  // Listen for Google Maps quota/auth limit events
  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Sync with body classes for accessibility font scales
  useEffect(() => {
    const body = document.body;
    body.classList.remove('accessible-mode', 'text-base', 'text-lg', 'text-xl');

    if (accessibilityMode === 'senior' || textScale === 'extra') {
      body.classList.add('accessible-mode');
    }
  }, [accessibilityMode, textScale]);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to persist reports', e);
    }
  }, [reports]);

  // Handler: citizen files a report
  const handleReportCreated = (newReport: CivicReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  // Handler: advance report status (demo lifecycle)
  const handleAdvanceStatus = (reportId: string) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;

        let nextStatus: ReportStatus = 'acknowledged';
        let note = 'Complaint acknowledged by municipal dispatch triage desk.';

        if (rep.status === 'submitted') {
          nextStatus = 'acknowledged';
          note = 'Grievance acknowledged. Assigned to Divisional Superintendent.';
        } else if (rep.status === 'acknowledged') {
          nextStatus = 'in_progress';
          note = 'Field maintenance crew dispatched under Active Work Order.';
        } else if (rep.status === 'in_progress') {
          nextStatus = 'resolved';
          note = 'Repair completed and verified by civic inspector.';
        } else {
          nextStatus = 'submitted';
          note = 'Status reset for demonstration testing.';
        }

        const newHistory = [
          ...rep.statusHistory,
          {
            status: nextStatus,
            timestamp: new Date().toISOString(),
            note,
            officer: 'Municipal Operations Desk',
          },
        ];

        return {
          ...rep,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
          statusHistory: newHistory,
        };
      })
    );
  };

  // Handler: Authority adds inspection note
  const handleAddOfficerNote = (reportId: string, note: string, newStatus?: ReportStatus) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== reportId) return rep;
        const status = newStatus || rep.status;

        const updatedHistory = [
          ...rep.statusHistory,
          {
            status,
            timestamp: new Date().toISOString(),
            note,
            officer: 'Er. R. K. Sharma (Zonal Chief)',
          },
        ];

        return {
          ...rep,
          status,
          updatedAt: new Date().toISOString(),
          statusHistory: updatedHistory,
        };
      })
    );
  };

  // Focus map
  const handleFocusMap = (report: CivicReport) => {
    setFocusedReport(report);
    setCurrentTab('map');
  };

  const t = TRANSLATIONS[language];

  const content = (
    <div className={`min-h-screen flex flex-col bg-[#F7F5F0] text-[#1C2B39] selection:bg-[#2F5D8A] selection:text-white ${
      textScale === 'large' ? 'text-[17px]' : textScale === 'extra' ? 'text-[19px]' : 'text-[15px]'
    }`}>
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Navbar & Accessibility Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        accessibilityMode={accessibilityMode}
        setAccessibilityMode={setAccessibilityMode}
        textScale={textScale}
        setTextScale={setTextScale}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {currentTab === 'report' && (
          <ReportForm
            onReportCreated={handleReportCreated}
            language={language}
            accessibilityMode={accessibilityMode}
          />
        )}

        {currentTab === 'track' && (
          <TicketTracker
            reports={reports}
            onAdvanceStatus={handleAdvanceStatus}
            onFocusMap={handleFocusMap}
            language={language}
            accessibilityMode={accessibilityMode}
          />
        )}

        {currentTab === 'map' && (
          <CivicMap
            reports={reports}
            focusedReport={focusedReport}
            onAdvanceStatus={handleAdvanceStatus}
            language={language}
            hasApiKey={Boolean(GOOGLE_MAPS_API_KEY)}
          />
        )}

        {currentTab === 'officer' && (
          <AuthorityDashboard
            reports={reports}
            onAddOfficerNote={handleAddOfficerNote}
            language={language}
          />
        )}
      </main>

      {/* Municipal Civic Utility Footer */}
      <footer className="border-t border-[#D8D2C5] bg-white text-[#1C2B39] py-8 px-4 mt-12 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#2F5D8A]" />
              <span className="font-bold text-sm tracking-tight text-[#1C2B39]">CIVIC PORTAL</span>
            </div>
            <p className="text-[#6B7280] leading-relaxed">
              Public utility grievance portal for municipal infrastructure repair, sanitation monitoring, and transparent citizen service delivery.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#6B7280]">
              Emergency Civic Hotlines
            </h4>
            <p className="text-[#4B5563]">Roads & PWD: <strong className="ticket-mono text-[#1C2B39]">1800-425-7623</strong></p>
            <p className="text-[#4B5563]">Sanitation & Waste: <strong className="ticket-mono text-[#1C2B39]">1800-425-9988</strong></p>
            <p className="text-[#4B5563]">Streetlighting Desk: <strong className="ticket-mono text-[#1C2B39]">1800-425-3312</strong></p>
            <p className="text-[#4B5563]">Water & Sewerage: <strong className="ticket-mono text-[#1C2B39]">1800-425-4420</strong></p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#6B7280]">
              Citizen Accessibility
            </h4>
            <p className="text-[#6B7280]">
              Conforms to WCAG 2.1 AA Standards. Multi-generational senior citizen layout, voice input dictation, and multilingual localization.
            </p>
            <p className="text-[11px] text-[#2F5D8A] font-semibold">
              Senior Citizen Priority Line: 1800-11-2356
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-[#6B7280]">
              Zero-Build Replit Export
            </h4>
            <p className="text-[#6B7280]">
              Need to run this as a standalone HTML file in Replit or offline?
            </p>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#2F5D8A] text-white hover:bg-[#24496D] transition-colors"
            >
              <span>Download Single-File HTML</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-[#EBE7DF] mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#6B7280]">
          <p>© 2026 Municipal Corporation • Citizen Service Guarantee Charter • Public Works Division</p>
          <div className="flex gap-4">
            <span>Section 4 RTI Compliant</span>
            <span>•</span>
            <span>Data Storage: Local Browser Engine</span>
          </div>
        </div>
      </footer>

      {/* Standalone Replit Export Modal */}
      <ExportModal
        reports={reports}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );

  return (
    <APIProvider
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={['marker', 'places']}
      language="en"
      region="IN"
    >
      {content}
    </APIProvider>
  );
}
