import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  Mic, 
  MicOff, 
  UploadCloud, 
  CheckCircle, 
  Clock, 
  Phone, 
  User, 
  ShieldAlert, 
  AlertCircle, 
  Building,
  Image as ImageIcon,
  X,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { CivicCategory, CivicReport, SupportedLanguage, UserAccessibilityMode } from '../types';
import { CATEGORY_OPTIONS, DEPARTMENTS, detectCategoryFromText } from '../utils/categories';
import { TRANSLATIONS } from '../data/translations';
import { useAutocompleteSuggestions } from '../hooks/useAutocompleteSuggestions';
import { getGoogleMapsSearchUrl } from '../utils/googleMapsLinks';

interface ReportFormProps {
  onReportCreated: (report: CivicReport) => void;
  language: SupportedLanguage;
  accessibilityMode: UserAccessibilityMode;
}

export const ReportForm: React.FC<ReportFormProps> = ({
  onReportCreated,
  language,
  accessibilityMode,
}) => {
  const t = TRANSLATIONS[language];

  // Form State
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CivicCategory>('pothole');
  const [detectedCategory, setDetectedCategory] = useState<CivicCategory | null>(null);
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 13.0827, lng: 80.2707 });
  const [isLocating, setIsLocating] = useState(false);
  const [locationCaptured, setLocationCaptured] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<CivicReport | null>(null);

  // Voice dictation state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { suggestions: placeSuggestions, resetSession } = useAutocompleteSuggestions(
    address,
    showPlaceDropdown && !address.startsWith('GPS:')
  );

  const handleSelectPlaceSuggestion = async (
    suggestion: google.maps.places.AutocompleteSuggestion
  ) => {
    if (!suggestion.placePrediction) return;
    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['formattedAddress', 'displayName', 'location'],
      });
      const resolvedAddress =
        place.formattedAddress ||
        place.displayName ||
        suggestion.placePrediction.text.text;
      setAddress(resolvedAddress);
      if (place.location) {
        setCoords({
          lat: place.location.lat(),
          lng: place.location.lng(),
        });
        setLocationCaptured(true);
      }
    } catch (err: any) {
      const msg = String(err?.message || err || '');
      if (
        msg.includes('RESOURCE_EXHAUSTED') ||
        msg.includes('OVER_QUERY_LIMIT') ||
        msg.includes('429')
      ) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
      setAddress(suggestion.placePrediction.text.text);
    } finally {
      setShowPlaceDropdown(false);
      resetSession();
    }
  };

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      
      // Map app language to speech lang code
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-US',
        hi: 'hi-IN',
        ta: 'ta-IN',
        es: 'es-ES',
        te: 'te-IN',
        bn: 'bn-IN',
      };
      recognizer.lang = langMap[language] || 'en-US';

      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognizer.onerror = () => {
        setIsListening(false);
      };

      recognizer.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognizer;
    }
  }, [language]);

  // Keyword auto-suggestion as citizen types
  useEffect(() => {
    const autoDetected = detectCategoryFromText(description);
    if (autoDetected) {
      setDetectedCategory(autoDetected);
      setSelectedCategory(autoDetected);
    } else {
      setDetectedCategory(null);
    }
  }, [description]);

  const toggleVoice = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition is not supported in this browser or environment.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn(err);
        setIsListening(false);
      }
    }
  };

  // Location handler
  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setAddress(`GPS: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (Near Civic Ward 14)`);
          setIsLocating(false);
          setLocationCaptured(true);
        },
        () => {
          // Fallback realistic city coordinates
          setCoords({ lat: 13.0835, lng: 80.2715 });
          setAddress('Civic Center Hub, Central Boulevard, Ward 14');
          setIsLocating(false);
          setLocationCaptured(true);
        },
        { timeout: 8000 }
      );
    } else {
      setCoords({ lat: 13.0835, lng: 80.2715 });
      setAddress('Civic Center Hub, Central Boulevard, Ward 14');
      setIsLocating(false);
      setLocationCaptured(true);
    }
  };

  // Photo handlers
  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset sample photos for fast testing
  const setSamplePhoto = (type: 'pothole' | 'garbage' | 'light' | 'water') => {
    const samples: Record<string, string> = {
      pothole: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      garbage: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80',
      light: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      water: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
    };
    setImagePreview(samples[type]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const newTicketId = `CVC-2026-${randomNum}`;
      const department = DEPARTMENTS[selectedCategory];

      const report: CivicReport = {
        id: newTicketId,
        title: description.slice(0, 60) + (description.length > 60 ? '...' : ''),
        description,
        category: selectedCategory,
        department,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        latitude: coords.lat,
        longitude: coords.lng,
        address: address || 'Geotagged via Municipal Portal, Ward 14',
        imageUrl: imagePreview || undefined,
        citizenName: citizenName || undefined,
        citizenPhone: citizenPhone || undefined,
        urgency,
        statusHistory: [
          {
            status: 'submitted',
            timestamp: new Date().toISOString(),
            note: 'Complaint officially lodged via Civic Utility Web Portal.',
          },
        ],
      };

      onReportCreated(report);
      setSubmittedTicket(report);
      setIsSubmitting(false);

      // Reset form
      setDescription('');
      setImagePreview(null);
      setAddress('');
      setLocationCaptured(false);
    }, 600);
  };

  const activeDepartment = DEPARTMENTS[selectedCategory];

  return (
    <div className="space-y-6">
      {/* Senior Citizen Guide Banner when Senior Mode is active */}
      {accessibilityMode === 'senior' && (
        <div className="bg-[#FAF4E6] border-2 border-[#E2A63B] rounded p-4 text-[#1C2B39]">
          <div className="flex items-center gap-2 mb-2 font-bold text-lg text-[#946200]">
            <CheckCircle className="w-6 h-6 text-[#E2A63B]" />
            <span>Senior Citizen Simple 3-Step Guide</span>
          </div>
          <p className="text-base mb-3 font-medium">
            {t.seniorHelpNotice}{' '}
            <strong className="text-lg underline underline-offset-4">{t.seniorHelplineNumber}</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white p-3 rounded border border-[#E2A63B]/50 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E2A63B] text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <div>
                <p className="font-bold">Describe Problem</p>
                <p className="text-xs text-[#6B7280]">Type or tap "Speak" button to use voice.</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-[#E2A63B]/50 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E2A63B] text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <div>
                <p className="font-bold">Add Location</p>
                <p className="text-xs text-[#6B7280]">Tap "Use My GPS Location" with one click.</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded border border-[#E2A63B]/50 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E2A63B] text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <div>
                <p className="font-bold">Submit & Track</p>
                <p className="text-xs text-[#6B7280]">Receive official ticket reference number.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Banner upon submission */}
      {submittedTicket && (
        <div className="bg-[#EBF5EF] border border-[#3F7D58] rounded p-5 text-[#1C2B39] shadow-xs">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3F7D58] text-white flex items-center justify-center shrink-0 mt-0.5">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#235035]">
                  {t.successMessage}
                </h3>
                <p className="text-sm text-[#4B5563] mt-0.5">
                  Your reference ID is{' '}
                  <span className="ticket-mono font-bold text-base px-2 py-0.5 bg-white border border-[#3F7D58]/30 rounded text-[#1C2B39]">
                    {submittedTicket.id}
                  </span>
                </p>
                <div className="mt-2 text-xs text-[#4B5563] flex flex-wrap items-center gap-3">
                  <span>Department: <strong>{submittedTicket.department.name}</strong></span>
                  <span>Target SLA: <strong>{submittedTicket.department.slaHours} Hours</strong></span>
                  <a
                    href={getGoogleMapsSearchUrl(submittedTicket.latitude, submittedTicket.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#2F5D8A] hover:underline"
                  >
                    <span>View in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSubmittedTicket(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Form Layout: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded border border-[#D8D2C5] p-6 space-y-6 shadow-2xs">
          <div className="border-b border-[#EBE7DF] pb-4">
            <h2 className="text-xl font-bold tracking-tight text-[#1C2B39]">
              {t.formTitle}
            </h2>
            <p className="text-xs text-[#6B7280] mt-1">
              {t.formSubtitle}
            </p>
          </div>

          {/* 1. Problem Description Box with Voice Input & Keyword Auto-Detect */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="problem-desc" className="block text-sm font-semibold text-[#1C2B39]">
                {t.descriptionLabel} <span className="text-red-500">*</span>
              </label>

              {/* Voice button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                    isListening
                      ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse'
                      : 'bg-[#F2F1EC] text-[#2F5D8A] border border-[#D8D2C5] hover:bg-[#E5E2D9]'
                  }`}
                  title={t.seniorVoiceHint}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isListening ? t.stopVoice : t.startVoice}</span>
                </button>
              )}
            </div>

            {isListening && (
              <div className="text-xs font-medium text-red-600 flex items-center gap-1.5 bg-red-50 p-2 rounded border border-red-200">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>{t.listening}</span>
              </div>
            )}

            <textarea
              id="problem-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              rows={accessibilityMode === 'senior' ? 5 : 4}
              required
              className="w-full rounded border border-[#C5BFB3] p-3 text-sm focus:border-[#2F5D8A] focus:ring-1 focus:ring-[#2F5D8A] bg-[#FAF8F5]"
            />

            {/* Auto-suggested category indicator */}
            {detectedCategory && (
              <div className="flex items-center gap-1.5 text-xs text-[#2F5D8A] bg-[#2F5D8A]/10 px-2.5 py-1 rounded border border-[#2F5D8A]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#E2A63B]" />
                <span>
                  {t.autoDetected}: <strong>{CATEGORY_OPTIONS.find(c => c.key === detectedCategory)?.labelEn}</strong>
                </span>
              </div>
            )}
          </div>

          {/* 2. Category Manual Override Chips */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1C2B39]">
              {t.categoryLabel}
            </label>
            <p className="text-xs text-[#6B7280]">
              {t.categoryManualNotice}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#2F5D8A] text-white border-[#2F5D8A] shadow-xs'
                        : 'bg-[#F7F5F0] text-[#1C2B39] border-[#D8D2C5] hover:bg-white'
                    }`}
                  >
                    {cat.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Location and GPS */}
          <div className="space-y-2">
            <label htmlFor="problem-location" className="block text-sm font-semibold text-[#1C2B39]">
              {t.locationLabel}
            </label>
            <div className="flex gap-2 flex-col sm:flex-row relative">
              <div className="flex-1 relative">
                <input
                  id="problem-location"
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setShowPlaceDropdown(true);
                  }}
                  onFocus={() => setShowPlaceDropdown(true)}
                  onBlur={() => setTimeout(() => setShowPlaceDropdown(false), 180)}
                  placeholder={t.locationPlaceholder}
                  autoComplete="off"
                  className="w-full rounded border border-[#C5BFB3] px-3 py-2 text-sm focus:border-[#2F5D8A] focus:ring-1 focus:ring-[#2F5D8A] bg-[#FAF8F5]"
                />

                {showPlaceDropdown && placeSuggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border border-[#C5BFB3] rounded shadow-lg max-h-56 overflow-y-auto divide-y divide-[#EBE7DF]">
                    {placeSuggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          void handleSelectPlaceSuggestion(suggestion);
                        }}
                        className="px-3 py-2 text-xs text-[#1C2B39] hover:bg-[#FAF8F5] cursor-pointer flex items-start gap-2"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#2F5D8A] shrink-0 mt-0.5" />
                        <span>{suggestion.placePrediction?.text.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-semibold border whitespace-nowrap transition-colors ${
                  locationCaptured
                    ? 'bg-[#EBF5EF] text-[#235035] border-[#3F7D58]'
                    : 'bg-[#FAF8F5] text-[#2F5D8A] border-[#2F5D8A] hover:bg-[#2F5D8A] hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#E2A63B]" />
                <span>{isLocating ? t.locating : locationCaptured ? t.locationFound : t.useMyLocation}</span>
              </button>
            </div>
            {locationCaptured && (
              <div className="flex items-center justify-between text-[11px] text-[#235035] bg-[#EBF5EF]/70 px-2.5 py-1 rounded border border-[#3F7D58]/30">
                <span className="ticket-mono">
                  Coordinates: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                </span>
                <a
                  href={getGoogleMapsSearchUrl(coords.lat, coords.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#2F5D8A] hover:underline"
                >
                  <span>Verify on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* 4. Photo Upload / Evidence with quick presets */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1C2B39]">
              {t.photoLabel}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageFile}
              accept="image/*"
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative rounded border border-[#C5BFB3] p-2 bg-[#FAF8F5] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Evidence thumbnail"
                    className="w-16 h-16 object-cover rounded border border-[#D8D2C5]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#235035] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t.photoUploaded}</span>
                    </p>
                    <p className="text-[11px] text-[#6B7280]">Attached as geo-referenced visual record.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="text-gray-400 hover:text-gray-600 p-1.5"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#C5BFB3] rounded p-4 text-center cursor-pointer hover:bg-[#F2F0EB] transition-colors bg-[#FAF8F5]"
              >
                <UploadCloud className="w-6 h-6 text-[#2F5D8A] mx-auto mb-1" />
                <p className="text-xs font-semibold text-[#1C2B39]">{t.takePhoto}</p>
                <p className="text-[11px] text-[#6B7280]">{t.photoHint}</p>
              </div>
            )}

            {/* Quick Demo Photo Presets for immediate testing */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6B7280]">
              <span>Sample Photos for Demo:</span>
              <button
                type="button"
                onClick={() => setSamplePhoto('pothole')}
                className="underline hover:text-[#1C2B39]"
              >
                Pothole
              </button>
              •
              <button
                type="button"
                onClick={() => setSamplePhoto('garbage')}
                className="underline hover:text-[#1C2B39]"
              >
                Garbage
              </button>
              •
              <button
                type="button"
                onClick={() => setSamplePhoto('light')}
                className="underline hover:text-[#1C2B39]"
              >
                Streetlight
              </button>
              •
              <button
                type="button"
                onClick={() => setSamplePhoto('water')}
                className="underline hover:text-[#1C2B39]"
              >
                Water Leak
              </button>
            </div>
          </div>

          {/* 5. Citizen Contact Details & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EBE7DF]">
            <div>
              <label htmlFor="citizen-name" className="block text-xs font-semibold text-[#1C2B39] mb-1">
                {t.citizenNameLabel}
              </label>
              <input
                id="citizen-name"
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder={t.citizenNamePlaceholder}
                className="w-full rounded border border-[#C5BFB3] px-3 py-1.5 text-xs bg-[#FAF8F5]"
              />
            </div>
            <div>
              <label htmlFor="citizen-phone" className="block text-xs font-semibold text-[#1C2B39] mb-1">
                {t.citizenPhoneLabel}
              </label>
              <input
                id="citizen-phone"
                type="tel"
                value={citizenPhone}
                onChange={(e) => setCitizenPhone(e.target.value)}
                placeholder={t.citizenPhonePlaceholder}
                className="w-full rounded border border-[#C5BFB3] px-3 py-1.5 text-xs bg-[#FAF8F5]"
              />
            </div>
          </div>

          {/* 6. Urgency Selector */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C2B39]">
              {t.urgencyLabel}
            </label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'low'}
                  onChange={() => setUrgency('low')}
                  className="text-[#2F5D8A]"
                />
                <span>{t.urgencyNormal}</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'medium'}
                  onChange={() => setUrgency('medium')}
                  className="text-[#2F5D8A]"
                />
                <span>{t.urgencyHigh}</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'high'}
                  onChange={() => setUrgency('high')}
                  className="text-red-600"
                />
                <span className="font-semibold text-red-700">{t.urgencyCritical}</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !description.trim()}
            className={`w-full py-3 px-4 rounded font-bold text-white shadow-xs transition-all flex items-center justify-center gap-2 ${
              isSubmitting || !description.trim()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2F5D8A] hover:bg-[#24496D] cursor-pointer'
            } ${accessibilityMode === 'senior' ? 'text-lg py-4' : 'text-sm'}`}
          >
            <CheckCircle className="w-4 h-4 text-[#E2A63B]" />
            <span>{isSubmitting ? t.submitting : t.submitButton}</span>
          </button>
        </form>

        {/* Right Column (5 Cols): Live Auto-Routing Preview & Municipal Authority SLA */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded border-2 border-[#2F5D8A] p-5 shadow-xs">
            <div className="flex items-center gap-2 border-b border-[#EBE7DF] pb-3 mb-4">
              <Building className="w-5 h-5 text-[#2F5D8A]" />
              <div>
                <h3 className="text-sm font-bold text-[#1C2B39] tracking-tight">
                  {t.routingHeader}
                </h3>
                <p className="text-[11px] text-[#6B7280]">
                  Live routing determined by chosen category
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Department Name */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6B7280]">
                  {t.routingDept}
                </span>
                <p className="text-base font-bold text-[#1C2B39] mt-0.5">
                  {activeDepartment.name}
                </p>
                <span className="inline-block mt-1 ticket-mono text-xs px-2 py-0.5 bg-[#F1EFEA] border border-[#D8D2C5] rounded text-[#1C2B39] font-medium">
                  Jurisdiction Code: {activeDepartment.code}
                </span>
              </div>

              {/* SLA Target */}
              <div className="bg-[#FAF8F5] p-3 rounded border border-[#E5E0D6] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B7280] font-medium">{t.slaHeader}</span>
                  <div className="text-2xl font-extrabold text-[#2F5D8A] tracking-tight mt-0.5">
                    {activeDepartment.slaHours}{' '}
                    <span className="text-xs font-normal text-[#6B7280]">{t.slaHoursUnit}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#2F5D8A]/10 text-[#2F5D8A] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              {/* Department Officer & Helpline */}
              <div className="space-y-2 pt-2 border-t border-[#EBE7DF] text-xs">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#6B7280]">{t.officerLine}:</span>
                    <p className="font-semibold text-[#1C2B39]">{activeDepartment.officerInCharge}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#6B7280]">{t.contactLine}:</span>
                    <p className="font-semibold text-[#1C2B39] ticket-mono">{activeDepartment.contactNumber}</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#6B7280] bg-[#F7F5F0] p-2.5 rounded border border-[#E5E0D6]">
                {t.routingNotice}
              </p>
            </div>
          </div>

          {/* Quick Municipal Assurance Info Card */}
          <div className="bg-[#FAF8F5] rounded border border-[#D8D2C5] p-4 text-xs text-[#1C2B39] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#2F5D8A]">
              <AlertCircle className="w-4 h-4 text-[#E2A63B]" />
              <span>Civic Transparency Guarantee</span>
            </div>
            <p className="text-[#6B7280] leading-relaxed">
              Every submission is sealed with a cryptographically verifiable complaint sequence ID. You can track progress in real-time, view field inspection updates, or download an official citizen receipt for public records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
