import React from 'react';
import { 
  Building2, 
  Languages, 
  Eye, 
  FileCode, 
  ShieldCheck, 
  PhoneCall, 
  Sliders, 
  MapPin, 
  FileText, 
  PlusCircle, 
  CheckCircle2,
  Users
} from 'lucide-react';
import { SupportedLanguage, UserAccessibilityMode, TextScale } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentTab: 'report' | 'track' | 'map' | 'officer';
  setCurrentTab: (tab: 'report' | 'track' | 'map' | 'officer') => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  accessibilityMode: UserAccessibilityMode;
  setAccessibilityMode: (mode: UserAccessibilityMode) => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  accessibilityMode,
  setAccessibilityMode,
  textScale,
  setTextScale,
  onOpenExportModal,
}) => {
  const t = TRANSLATIONS[language];

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  ];

  return (
    <header className="border-b border-[#D8D2C5] bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Utility Banner for Official Verification, Age Access & Helplines */}
      <div className="bg-[#1C2B39] text-[#F7F5F0] px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E2A63B] animate-pulse"></span>
          <span className="font-semibold tracking-wider text-[11px] uppercase">
            Official Municipal Civic Redressal Utility • Gov Portal 2026
          </span>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-[11px]">
          {accessibilityMode === 'senior' && (
            <div className="flex items-center gap-1.5 bg-[#E2A63B]/20 text-[#E2A63B] px-2 py-0.5 rounded-sm font-medium">
              <PhoneCall className="w-3 h-3" />
              <span>Senior Desk: <strong>1800-11-2356</strong> (24x7 Free)</span>
            </div>
          )}

          {/* Text scale control */}
          <div className="flex items-center gap-1 bg-[#2C3E50] px-1.5 py-0.5 rounded">
            <span className="text-[#9CA3AF] text-[10px] mr-1">{t.fontSize}:</span>
            <button
              onClick={() => setTextScale('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${textScale === 'normal' ? 'bg-[#2F5D8A] text-white' : 'text-gray-300 hover:text-white'}`}
              title="Standard Size"
            >
              A
            </button>
            <button
              onClick={() => setTextScale('large')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${textScale === 'large' ? 'bg-[#2F5D8A] text-white' : 'text-gray-300 hover:text-white'}`}
              title="Large Size (A+)"
            >
              A+
            </button>
            <button
              onClick={() => setTextScale('extra')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${textScale === 'extra' ? 'bg-[#2F5D8A] text-white' : 'text-gray-300 hover:text-white'}`}
              title="Extra Large (A++)"
            >
              A++
            </button>
          </div>

          {/* Age & Persona Mode Switcher */}
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-[#9CA3AF]" />
            <select
              value={accessibilityMode}
              onChange={(e) => setAccessibilityMode(e.target.value as UserAccessibilityMode)}
              className="bg-[#2C3E50] text-white border-none rounded px-2 py-0.5 text-[11px] focus:ring-1 focus:ring-[#E2A63B] cursor-pointer"
            >
              <option value="standard">{t.standardMode}</option>
              <option value="senior">{t.seniorMode}</option>
              <option value="officer">{t.officerMode}</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1">
            <Languages className="w-3 h-3 text-[#E2A63B]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-[#2C3E50] text-white border-none rounded px-2 py-0.5 text-[11px] font-medium focus:ring-1 focus:ring-[#E2A63B] cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.label})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Branding with official civic seal motif */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[#1C2B39] text-white flex items-center justify-center shrink-0 border border-[#2F5D8A]">
            <Building2 className="w-5 h-5 text-[#E2A63B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-[#1C2B39]">
                {t.portalTitle}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#2F5D8A]/10 text-[#2F5D8A] rounded border border-[#2F5D8A]/20">
                Civic Redress
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs and Standalone Replit Export Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <nav className="flex items-center p-1 bg-[#F1EFEA] rounded border border-[#D8D2C5]">
            <button
              onClick={() => setCurrentTab('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                currentTab === 'report'
                  ? 'bg-[#2F5D8A] text-white shadow-xs'
                  : 'text-[#1C2B39] hover:bg-white/60'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.reportProblem}</span>
            </button>

            <button
              onClick={() => setCurrentTab('track')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                currentTab === 'track'
                  ? 'bg-[#2F5D8A] text-white shadow-xs'
                  : 'text-[#1C2B39] hover:bg-white/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.trackTickets}</span>
            </button>

            <button
              onClick={() => setCurrentTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                currentTab === 'map'
                  ? 'bg-[#2F5D8A] text-white shadow-xs'
                  : 'text-[#1C2B39] hover:bg-white/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.mapView}</span>
            </button>

            <button
              onClick={() => setCurrentTab('officer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                currentTab === 'officer'
                  ? 'bg-[#1C2B39] text-white shadow-xs'
                  : 'text-[#1C2B39] hover:bg-white/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E2A63B]" />
              <span>{t.officerPortal}</span>
            </button>
          </nav>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-[#FAF8F5] border border-[#2F5D8A]/40 text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white transition-colors"
            title="Download single self-contained HTML file for Replit"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.replitExport}</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
