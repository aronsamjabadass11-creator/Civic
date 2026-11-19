import React, { useEffect, useState, useCallback } from 'react';
import {
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Crosshair,
  Building,
  Clock,
  ChevronRight,
  ExternalLink,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { CivicReport, ReportStatus, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DEPARTMENTS } from '../utils/categories';
import { getGoogleMapsSearchUrl, getGoogleMapsDirectionsUrl } from '../utils/googleMapsLinks';
import { TicketModal } from './TicketModal';

interface CivicMapProps {
  reports: CivicReport[];
  focusedReport?: CivicReport | null;
  onAdvanceStatus: (id: string) => void;
  language: SupportedLanguage;
  hasApiKey: boolean;
}

const DEFAULT_CENTER = { lat: 13.0827, lng: 80.2707 };
const DEFAULT_ZOOM = 13;

function getPinColors(status: ReportStatus) {
  switch (status) {
    case 'acknowledged':
      return { background: '#2F5D8A', borderColor: '#1C2B39', glyphColor: '#FFFFFF' };
    case 'in_progress':
      return { background: '#5B5BD6', borderColor: '#3730A3', glyphColor: '#FFFFFF' };
    case 'resolved':
      return { background: '#3F7D58', borderColor: '#1E3A28', glyphColor: '#FFFFFF' };
    case 'submitted':
    default:
      return { background: '#E2A63B', borderColor: '#855B06', glyphColor: '#1C2B39' };
  }
}

interface ReportMarkerProps {
  report: CivicReport;
  isSelected: boolean;
  onSelect: (report: CivicReport) => void;
  onCloseInfoWindow: () => void;
}

const ReportMarker: React.FC<ReportMarkerProps> = ({
  report,
  isSelected,
  onSelect,
  onCloseInfoWindow,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const colors = getPinColors(report.status);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: report.latitude, lng: report.longitude }}
        onClick={() => onSelect(report)}
        title={`${report.id}: ${report.title}`}
      >
        <Pin
          background={colors.background}
          borderColor={colors.borderColor}
          glyphColor={colors.glyphColor}
          scale={isSelected ? 1.25 : 1}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onCloseInfoWindow}
          maxWidth={270}
        >
          <div className="p-1 text-[#1C2B39] space-y-1.5 font-sans">
            <div className="flex items-center justify-between gap-2">
              <span className="ticket-mono text-xs font-bold text-[#2F5D8A]">
                {report.id}
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#F7F5F0] border border-[#D8D2C5]">
                {report.status.replace('_', ' ')}
              </span>
            </div>
            <p className="font-bold text-xs leading-snug">{report.title}</p>
            <p className="text-[11px] text-[#6B7280]">{report.address}</p>
            <div className="pt-1 flex items-center gap-3 text-[11px] font-semibold">
              <a
                href={getGoogleMapsSearchUrl(report.latitude, report.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2F5D8A] hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={getGoogleMapsDirectionsUrl(report.latitude, report.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3F7D58] hover:underline inline-flex items-center gap-1"
              >
                <Navigation className="w-3 h-3" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

interface MapCameraControllerProps {
  focusedReport?: CivicReport | null;
  centerTrigger: number;
}

const MapCameraController: React.FC<MapCameraControllerProps> = ({
  focusedReport,
  centerTrigger,
}) => {
  const map = useMap();

  useEffect(() => {
    if (focusedReport && map) {
      map.panTo({ lat: focusedReport.latitude, lng: focusedReport.longitude });
      map.setZoom(15);
    }
  }, [focusedReport, map]);

  useEffect(() => {
    if (centerTrigger > 0 && map) {
      map.panTo(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [centerTrigger, map]);

  return null;
};

export const CivicMap: React.FC<CivicMapProps> = ({
  reports,
  focusedReport,
  onAdvanceStatus,
  language,
  hasApiKey,
}) => {
  const t = TRANSLATIONS[language];
  const apiStatus = useApiLoadingStatus();

  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    focusedReport?.id || null
  );
  const [activeReceiptReport, setActiveReceiptReport] = useState<CivicReport | null>(null);
  const [mapStatusFilter, setMapStatusFilter] = useState<'all' | ReportStatus>('all');
  const [mapDeptFilter, setMapDeptFilter] = useState<string>('all');
  const [centerTrigger, setCenterTrigger] = useState(0);

  useEffect(() => {
    if (focusedReport) {
      setSelectedReportId(focusedReport.id);
    }
  }, [focusedReport]);

  const filteredReports = reports.filter((r) => {
    const matchStatus = mapStatusFilter === 'all' || r.status === mapStatusFilter;
    const matchDept = mapDeptFilter === 'all' || r.department.id === mapDeptFilter;
    return matchStatus && matchDept;
  });

  const selectedReport =
    reports.find((r) => r.id === selectedReportId) || null;

  const handleSelectReport = useCallback((report: CivicReport) => {
    setSelectedReportId(report.id);
  }, []);

  const handleCenter = () => {
    setCenterTrigger((c) => c + 1);
  };

  const mapLoadError =
    !hasApiKey ||
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE;

  return (
    <div className="space-y-4">
      {/* Map Header and Filter Bar */}
      <div className="bg-white rounded border border-[#D8D2C5] p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1C2B39]">
              {t.mapTitle}
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              {t.mapSubtitle}
            </p>
          </div>

          {/* Legend and Center Action */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 bg-[#FAF8F5] px-3 py-1.5 rounded border border-[#D8D2C5]">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                {t.mapLegend}:
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#855B06]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2A63B]"></span>
                Submitted
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#2F5D8A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2F5D8A]"></span>
                Acknowledged
              </span>
              <span className="flex items-center gap-1 font-semibold text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5B5BD6]"></span>
                In Progress
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#235035]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3F7D58]"></span>
                Resolved
              </span>
            </div>

            <button
              onClick={handleCenter}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#2F5D8A] text-white hover:bg-[#24496D] transition-colors cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>{t.centerLocation}</span>
            </button>
          </div>
        </div>

        {/* Status and Department Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#EBE7DF] text-xs">
          <div className="flex items-center gap-2">
            <label htmlFor="map-status-filter" className="font-semibold text-[#6B7280]">
              Status:
            </label>
            <select
              id="map-status-filter"
              value={mapStatusFilter}
              onChange={(e) => setMapStatusFilter(e.target.value as 'all' | ReportStatus)}
              className="rounded border border-[#C5BFB3] bg-[#FAF8F5] px-2.5 py-1 text-xs text-[#1C2B39]"
            >
              <option value="all">{t.filterAll}</option>
              <option value="submitted">{t.filterSubmitted}</option>
              <option value="acknowledged">{t.filterAcknowledged}</option>
              <option value="in_progress">{t.filterInProgress}</option>
              <option value="resolved">{t.filterResolved}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="map-dept-filter" className="font-semibold text-[#6B7280]">
              {t.filterByDept}:
            </label>
            <select
              id="map-dept-filter"
              value={mapDeptFilter}
              onChange={(e) => setMapDeptFilter(e.target.value)}
              className="rounded border border-[#C5BFB3] bg-[#FAF8F5] px-2.5 py-1 text-xs text-[#1C2B39]"
            >
              <option value="all">All Municipal Departments</option>
              {Object.values(DEPARTMENTS).map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <span className="ml-auto text-[#6B7280]">
            Showing <strong className="ticket-mono text-[#1C2B39]">{filteredReports.length}</strong> pins on Google Maps
          </span>
        </div>
      </div>

      {/* Interactive Map Layout with Inspection Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Map View Canvas (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded border border-[#D8D2C5] p-2 shadow-2xs overflow-hidden">
          {mapLoadError ? (
            <div className="w-full h-[550px] rounded bg-[#FAF8F5] border border-dashed border-[#C5BFB3] flex flex-col items-center justify-center p-6 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-[#E2A63B]" />
              <h3 className="font-bold text-base text-[#1C2B39]">
                Google Maps View Unavailable
              </h3>
              <p className="text-xs text-[#6B7280] max-w-md">
                {!hasApiKey
                  ? 'Google Maps API key is not configured yet. You can still open any civic report directly in Google Maps using the pin links below.'
                  : 'Unable to load Google Maps right now. Please check your network connection or API key restrictions.'}
              </p>
              <a
                href={getGoogleMapsSearchUrl(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-[#2F5D8A] text-white hover:bg-[#24496D]"
              >
                <span>Open Municipal Center in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="w-full h-[550px] rounded overflow-hidden">
              <GoogleMap
                mapId="DEMO_MAP_ID"
                defaultCenter={
                  focusedReport
                    ? { lat: focusedReport.latitude, lng: focusedReport.longitude }
                    : DEFAULT_CENTER
                }
                defaultZoom={focusedReport ? 15 : DEFAULT_ZOOM}
                gestureHandling="greedy"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
              >
                <MapCameraController
                  focusedReport={focusedReport}
                  centerTrigger={centerTrigger}
                />
                {filteredReports.map((report) => (
                  <ReportMarker
                    key={report.id}
                    report={report}
                    isSelected={selectedReportId === report.id}
                    onSelect={handleSelectReport}
                    onCloseInfoWindow={() => setSelectedReportId(null)}
                  />
                ))}
              </GoogleMap>
            </div>
          )}
        </div>

        {/* Pin Inspector Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedReport ? (
            <div className="bg-white rounded border-2 border-[#2F5D8A] p-5 shadow-xs space-y-4">
              <div className="border-b border-[#EBE7DF] pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Selected Pin Details
                  </span>
                  <p className="ticket-mono text-base font-bold text-[#2F5D8A]">
                    {selectedReport.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReportId(null)}
                  className="text-xs text-[#6B7280] hover:text-[#1C2B39] underline cursor-pointer"
                >
                  Deselect
                </button>
              </div>

              {selectedReport.imageUrl && (
                <img
                  src={selectedReport.imageUrl}
                  alt="Incident photo"
                  className="w-full h-36 object-cover rounded border border-[#D8D2C5]"
                />
              )}

              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#1C2B39]">
                  {selectedReport.title}
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {selectedReport.description}
                </p>
              </div>

              <div className="space-y-1.5 text-xs bg-[#FAF8F5] p-3 rounded border border-[#E5E0D6]">
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#2F5D8A] shrink-0" />
                  <span className="font-semibold text-[#1C2B39]">{selectedReport.department.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5 text-[#E2A63B] shrink-0" />
                  <span>{selectedReport.address}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#6B7280]">
                  <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                  <span>Lodged: {new Date(selectedReport.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Direct Google Maps Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleMapsSearchUrl(selectedReport.latitude, selectedReport.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2.5 rounded text-xs font-semibold bg-[#FAF8F5] border border-[#2F5D8A]/40 text-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={getGoogleMapsDirectionsUrl(selectedReport.latitude, selectedReport.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2.5 rounded text-xs font-semibold bg-[#EBF5EF] border border-[#3F7D58]/40 text-[#235035] hover:bg-[#3F7D58] hover:text-white transition-colors flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Action Buttons for Selected Report */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => onAdvanceStatus(selectedReport.id)}
                  className="w-full py-2 px-3 rounded text-xs font-semibold bg-[#2F5D8A] text-white hover:bg-[#24496D] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Advance Status (Next Step)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveReceiptReport(selectedReport)}
                  className="w-full py-2 px-3 rounded text-xs font-semibold bg-white border border-[#D8D2C5] text-[#1C2B39] hover:bg-[#F2F0EB] transition-colors cursor-pointer"
                >
                  Print Full Official Receipt
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded border border-[#D8D2C5] p-6 text-center text-[#6B7280] space-y-3">
              <MapPin className="w-8 h-8 text-[#2F5D8A] mx-auto opacity-70" />
              <h3 className="font-bold text-sm text-[#1C2B39]">Select Any Pin on Google Maps</h3>
              <p className="text-xs leading-relaxed">
                Click any color-coded pin to view photographic proof, assigned municipal division, target SLA, or launch Google Maps directions directly.
              </p>
            </div>
          )}

          {/* Quick Municipal Map Stats */}
          <div className="bg-[#FAF8F5] rounded border border-[#D8D2C5] p-4 text-xs space-y-2">
            <span className="font-bold text-[#1C2B39] block uppercase tracking-wider text-[11px]">
              Active Sector Dispatch Summary
            </span>
            <div className="flex justify-between border-b border-[#E5E0D6] pb-1">
              <span className="text-[#6B7280]">Total Active Hotspots:</span>
              <strong className="ticket-mono text-[#1C2B39]">{reports.length}</strong>
            </div>
            <div className="flex justify-between border-b border-[#E5E0D6] pb-1">
              <span className="text-[#6B7280]">PWD Roads Division:</span>
              <strong className="ticket-mono text-[#2F5D8A]">
                {reports.filter((r) => r.category === 'pothole').length}
              </strong>
            </div>
            <div className="flex justify-between border-b border-[#E5E0D6] pb-1">
              <span className="text-[#6B7280]">Solid Waste Sanitation:</span>
              <strong className="ticket-mono text-[#2F5D8A]">
                {reports.filter((r) => r.category === 'garbage').length}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Streetlighting & Electric:</span>
              <strong className="ticket-mono text-[#2F5D8A]">
                {reports.filter((r) => r.category === 'streetlight').length}
              </strong>
            </div>
          </div>
        </div>
      </div>

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
