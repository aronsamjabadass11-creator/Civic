import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  portalTitle: string;
  portalSubtitle: string;
  reportProblem: string;
  trackTickets: string;
  mapView: string;
  officerPortal: string;
  replitExport: string;

  // Age & Accessibility
  ageModeLabel: string;
  standardMode: string;
  standardModeDesc: string;
  seniorMode: string;
  seniorModeDesc: string;
  officerMode: string;
  officerModeDesc: string;
  fontSize: string;
  textSizeNormal: string;
  textSizeLarge: string;
  textSizeExtra: string;
  seniorHelpNotice: string;
  seniorVoiceHint: string;
  seniorHelplineTitle: string;
  seniorHelplineNumber: string;

  // Form
  formTitle: string;
  formSubtitle: string;
  photoLabel: string;
  photoHint: string;
  photoUploaded: string;
  takePhoto: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  listening: string;
  startVoice: string;
  stopVoice: string;
  detectedCategory: string;
  autoDetected: string;
  categoryLabel: string;
  categoryManualNotice: string;
  locationLabel: string;
  locationPlaceholder: string;
  useMyLocation: string;
  locating: string;
  locationFound: string;
  citizenNameLabel: string;
  citizenNamePlaceholder: string;
  citizenPhoneLabel: string;
  citizenPhonePlaceholder: string;
  urgencyLabel: string;
  urgencyNormal: string;
  urgencyHigh: string;
  urgencyCritical: string;
  submitButton: string;
  submitting: string;
  successMessage: string;

  // Auto-routing card
  routingHeader: string;
  routingDept: string;
  slaHeader: string;
  slaHoursUnit: string;
  contactLine: string;
  officerLine: string;
  routingNotice: string;

  // Tracking
  trackingTitle: string;
  searchPlaceholder: string;
  filterAll: string;
  filterSubmitted: string;
  filterAcknowledged: string;
  filterInProgress: string;
  filterResolved: string;
  noReportsFound: string;
  ticketId: string;
  reportedOn: string;
  department: string;
  advanceStatusDemo: string;
  advanceTo: string;
  viewReceipt: string;
  resolvedBadge: string;
  inProgressBadge: string;
  acknowledgedBadge: string;
  submittedBadge: string;

  // Map
  mapTitle: string;
  mapSubtitle: string;
  mapLegend: string;
  centerLocation: string;
  filterByDept: string;

  // Officer view
  officerDashboard: string;
  totalComplaints: string;
  pendingReview: string;
  underExecution: string;
  resolvedTotal: string;
  slaAdherence: string;
  actionRequired: string;
  dispatchCrew: string;
  addInspectionNote: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    portalTitle: 'CIVIC PORTAL',
    portalSubtitle: 'Municipal Citizen Redressal & Infrastructure Utility',
    reportProblem: 'Report a Problem',
    trackTickets: 'Track Complaints',
    mapView: 'Civic Live Map',
    officerPortal: 'Authority Portal',
    replitExport: 'Export Standalone HTML',

    ageModeLabel: 'Display Mode',
    standardMode: 'Citizen (Standard)',
    standardModeDesc: 'Optimized civic utility layout with keyboard shortcuts and rapid filing.',
    seniorMode: 'Senior Citizen (Large Text)',
    seniorModeDesc: 'High-contrast 125% typography, simplified step guide, and one-tap voice input.',
    officerMode: 'Municipal Staff (Review)',
    officerModeDesc: 'Administrative dashboard to review workloads, advance status, and log field notes.',
    fontSize: 'Text Scale',
    textSizeNormal: 'Standard',
    textSizeLarge: 'Large (A+)',
    textSizeExtra: 'Maximum (A++)',
    seniorHelpNotice: 'Need telephone help? You can also dial our 24x7 toll-free Senior Citizen Desk at',
    seniorVoiceHint: 'Tap "Speak" to dictate your problem without typing.',
    seniorHelplineTitle: 'Senior Civic Helpline',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'File an Infrastructure or Civic Problem',
    formSubtitle: 'Your submission is recorded with an official ticket ID and dispatched directly to the municipal jurisdiction.',
    photoLabel: 'Photographic Evidence (Optional)',
    photoHint: 'Drag and drop an image, upload from device, or take a quick snapshot.',
    photoUploaded: 'Image Attached Successfully',
    takePhoto: 'Add Photo',
    descriptionLabel: 'Problem Description',
    descriptionPlaceholder: 'e.g., Massive pothole near Market crossroad, water pipeline leaking onto footpath, broken streetlight on 4th Main...',
    listening: 'Listening to your voice...',
    startVoice: 'Speak Description',
    stopVoice: 'Stop Dictation',
    detectedCategory: 'Auto-Routing Prediction',
    autoDetected: 'Auto-detected via keywords',
    categoryLabel: 'Problem Category',
    categoryManualNotice: 'Select a category to route to the correct municipal wing:',
    locationLabel: 'Location / Landmark Address',
    locationPlaceholder: 'e.g., 24 Central Avenue, near Post Office, Ward 12',
    useMyLocation: 'Use My GPS Location',
    locating: 'Acquiring GPS...',
    locationFound: 'Coordinates captured',
    citizenNameLabel: 'Your Name (Optional)',
    citizenNamePlaceholder: 'e.g., Eleanor Vance',
    citizenPhoneLabel: 'Mobile Phone for SMS Updates (Optional)',
    citizenPhonePlaceholder: 'e.g., +1 (555) 019-2834',
    urgencyLabel: 'Urgency Level',
    urgencyNormal: 'Normal',
    urgencyHigh: 'High (Safety Hazard)',
    urgencyCritical: 'Critical / Emergency',
    submitButton: 'Submit Official Report',
    submitting: 'Registering Ticket...',
    successMessage: 'Ticket Registered Successfully!',

    routingHeader: 'Automatic Department Routing Live Preview',
    routingDept: 'Assigned Department',
    slaHeader: 'Official Resolution SLA',
    slaHoursUnit: 'Hours target timeframe',
    contactLine: 'Helpline Desk',
    officerLine: 'Zonal Lead',
    routingNotice: 'Based on your description, this complaint will be dispatched to this municipal division immediately upon submission.',

    trackingTitle: 'Registered Grievance Records',
    searchPlaceholder: 'Search by Ticket ID (e.g. CVC-2026) or address...',
    filterAll: 'All Statuses',
    filterSubmitted: 'Submitted',
    filterAcknowledged: 'Acknowledged',
    filterInProgress: 'In Progress',
    filterResolved: 'Resolved',
    noReportsFound: 'No complaints match the selected filter.',
    ticketId: 'Ticket Reference',
    reportedOn: 'Lodged Date',
    department: 'Department',
    advanceStatusDemo: 'Advance Status (Demo)',
    advanceTo: 'Advance to',
    viewReceipt: 'Print Receipt',
    resolvedBadge: 'Resolved',
    inProgressBadge: 'In Progress',
    acknowledgedBadge: 'Acknowledged',
    submittedBadge: 'Submitted',

    mapTitle: 'Civic Live Incident Map',
    mapSubtitle: 'Real-time geographic distribution of community reports and municipal maintenance crews.',
    mapLegend: 'Status Pin Legend',
    centerLocation: 'Locate My Area',
    filterByDept: 'Filter By Department',

    officerDashboard: 'Municipal Workload & SLA Monitor',
    totalComplaints: 'Total Received',
    pendingReview: 'Pending Triage',
    underExecution: 'Field Crews Dispatched',
    resolvedTotal: 'Resolved Within SLA',
    slaAdherence: 'SLA Redressal Rate',
    actionRequired: 'Officer Quick Actions',
    dispatchCrew: 'Dispatch Maintenance Crew',
    addInspectionNote: 'Log Field Inspection',
  },

  hi: {
    portalTitle: 'नागरिक सेवा पोर्टल',
    portalSubtitle: 'नगर निगम जन शिकायत निवारण एवं बुनियादी ढांचा उपयोगिता',
    reportProblem: 'समस्या दर्ज करें',
    trackTickets: 'शिकायत ट्रैक करें',
    mapView: 'नागरिक लाइव मानचित्र',
    officerPortal: 'अधिकारी पोर्टल',
    replitExport: 'HTML फ़ाइल निर्यात करें',

    ageModeLabel: 'प्रदर्शन मोड',
    standardMode: 'नागरिक (सामान्य)',
    standardModeDesc: 'कुशल इंटरफ़ेस और तीव्र शिकायत पंजीकरण लेआउट।',
    seniorMode: 'वरिष्ठ नागरिक (बड़ा फॉन्ट)',
    seniorModeDesc: '125% बड़ा पाठ, उच्च कंट्रास्ट और आसान आवाज़ इनपुट।',
    officerMode: 'नगर निगम कर्मचारी (समीक्षा)',
    officerModeDesc: 'शिकायतों की समीक्षा, स्थिति अद्यतन और फील्ड नोट्स दर्ज करने का डैशबोर्ड।',
    fontSize: 'फॉन्ट आकार',
    textSizeNormal: 'सामान्य',
    textSizeLarge: 'बड़ा (A+)',
    textSizeExtra: 'अधिकतम (A++)',
    seniorHelpNotice: 'फ़ोन पर सहायता चाहिए? हमारे 24 घंटे वरिष्ठ नागरिक हेल्पडेस्क पर संपर्क करें:',
    seniorVoiceHint: 'टाइप किए बिना बोलने के लिए "बोलें" पर टैप करें।',
    seniorHelplineTitle: 'वरिष्ठ नागरिक सहायता',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'सड़क, स्वच्छता या बिजली की समस्या दर्ज करें',
    formSubtitle: 'आपकी शिकायत को आधिकारिक टिकट नंबर आवंटित कर संबंधित विभाग को तुरंत भेजा जाएगा।',
    photoLabel: 'फ़ोटो प्रमाण (वैकल्पिक)',
    photoHint: 'तस्वीर खींचें या डिवाइस से अपलोड करें।',
    photoUploaded: 'फ़ोटो सफलतापूर्वक जोड़ी गई',
    takePhoto: 'फ़ोटो जोड़ें',
    descriptionLabel: 'समस्या का विवरण',
    descriptionPlaceholder: 'उदा. मुख्य सड़क पर गहरा गड्ढा, सीवर का पानी बह रहा है, स्ट्रीटलाइट बंद है...',
    listening: 'आपकी आवाज़ सुनी जा रही है...',
    startVoice: 'बोलकर बताएं',
    stopVoice: 'रोकें',
    detectedCategory: 'स्वतः पहचानी गई श्रेणी',
    autoDetected: 'शब्दों के आधार पर स्वतः चयनित',
    categoryLabel: 'समस्या श्रेणी',
    categoryManualNotice: 'सटीक विभाग को भेजने के लिए श्रेणी चुनें:',
    locationLabel: 'स्थान या निकटतम पता',
    locationPlaceholder: 'उदा. गांधी चौक, डाकघर के पास, वार्ड 12',
    useMyLocation: 'मेरा GPS स्थान उपयोग करें',
    locating: 'GPS खोजा जा रहा है...',
    locationFound: 'स्थान दर्ज किया गया',
    citizenNameLabel: 'आपका नाम (वैकल्पिक)',
    citizenNamePlaceholder: 'उदा. रमेश कुमार',
    citizenPhoneLabel: 'मोबाइल नंबर (SMS अपडेट हेतु)',
    citizenPhonePlaceholder: 'उदा. 9876543210',
    urgencyLabel: 'प्राथमिकता स्तर',
    urgencyNormal: 'सामान्य',
    urgencyHigh: 'उच्च (सुरक्षा जोखिम)',
    urgencyCritical: 'अत्यंत गंभीर (आपातकालीन)',
    submitButton: 'आधिकारिक शिकायत दर्ज करें',
    submitting: 'दर्ज हो रहा है...',
    successMessage: 'शिकायत सफलतापूर्वक दर्ज हुई!',

    routingHeader: 'स्वतः विभागीय अग्रेषण पूर्वावलोकन',
    routingDept: 'आवंटित विभाग',
    slaHeader: 'आधिकारिक निवारण समयसीमा (SLA)',
    slaHoursUnit: 'घंटे अधिकतम अवधि',
    contactLine: 'हेल्पलाइन नंबर',
    officerLine: 'प्रभारी अधिकारी',
    routingNotice: 'आपके विवरण के अनुसार यह शिकायत तुरंत इस विभाग के इंजीनियर को भेज दी जाएगी।',

    trackingTitle: 'दर्ज शिकायतों का विवरण',
    searchPlaceholder: 'टिकट संख्या (जैसे CVC-2026) या पता खोजें...',
    filterAll: 'सभी स्थितियां',
    filterSubmitted: 'दर्ज (Submitted)',
    filterAcknowledged: 'स्वीकृत (Acknowledged)',
    filterInProgress: 'कार्य जारी (In Progress)',
    filterResolved: 'निस्तारित (Resolved)',
    noReportsFound: 'इस फ़िल्टर से कोई शिकायत नहीं मिली।',
    ticketId: 'टिकट संदर्भ संख्या',
    reportedOn: 'दर्ज दिनांक',
    department: 'विभाग',
    advanceStatusDemo: 'स्थिति आगे बढ़ाएं (डेमो)',
    advanceTo: 'अगली स्थिति:',
    viewReceipt: 'रसीद प्रिंट करें',
    resolvedBadge: 'निस्तारित',
    inProgressBadge: 'कार्य प्रगति पर',
    acknowledgedBadge: 'स्वीकृत',
    submittedBadge: 'दर्ज हुआ',

    mapTitle: 'नागरिक लाइव मैप',
    mapSubtitle: 'शहर भर में दर्ज शिकायतों और नगर पालिका टीमों का वास्तविक समय नक्शा।',
    mapLegend: 'रंग संकेत',
    centerLocation: 'मेरा क्षेत्र दिखाएं',
    filterByDept: 'विभाग अनुसार फ़िल्टर',

    officerDashboard: 'नगर निगम कार्यभार एवं SLA ट्रैकर',
    totalComplaints: 'कुल प्राप्त शिकायतें',
    pendingReview: 'समीक्षा हेतु लंबित',
    underExecution: 'फील्ड टीम तैनात',
    resolvedTotal: 'समय पर निस्तारित',
    slaAdherence: 'SLA अनुपालन दर',
    actionRequired: 'त्वरित कार्रवाई',
    dispatchCrew: 'मरम्मत टीम भेजें',
    addInspectionNote: 'निरीक्षण नोट लिखें',
  },

  ta: {
    portalTitle: 'குடிமக்கள் சேவை போர்டல்',
    portalSubtitle: 'மாநகராட்சி மக்கள் குறைதீர்ப்பு மற்றும் உள்கட்டமைப்பு தளம்',
    reportProblem: 'புகார் பதிவு செய்க',
    trackTickets: 'புகாரை கண்காணிக்க',
    mapView: 'நேரலை வரைபடம்',
    officerPortal: 'அதிகாரி போர்டல்',
    replitExport: 'HTML கோப்பை பதிவிறக்குக',

    ageModeLabel: 'காட்சி முறை',
    standardMode: 'குடிமகன் (வழக்கமான)',
    standardModeDesc: 'வேகமான புகார் பதிவு மற்றும் விசைப்பலகை குறுக்குவழிகள்.',
    seniorMode: 'மூத்த குடிமக்கள் (பெரிய எழுத்து)',
    seniorModeDesc: '125% பெரிய எழுத்துக்கள், எளிய வழிகாட்டி மற்றும் குரல் உள்ளீடு.',
    officerMode: 'மாநகராட்சி ஊழியர் (ஆய்வு)',
    officerModeDesc: 'புகார்களை ஆய்வு செய்து களப்பணி குறிப்புகளை பதிவிடும் தளம்.',
    fontSize: 'எழுத்து அளவு',
    textSizeNormal: 'வழக்கமான',
    textSizeLarge: 'பெரியது (A+)',
    textSizeExtra: 'மிகப் பெரியது (A++)',
    seniorHelpNotice: 'தொலைபேசி உதவி தேவையா? எங்கள் 24 மணி நேர இலவச மூத்த குடிமக்கள் உதவி எண்ணை அழைக்கவும்:',
    seniorVoiceHint: 'தட்டச்சு செய்யாமல் பேச "பேசுக" என்பதை அழுத்தவும்.',
    seniorHelplineTitle: 'மூத்த குடிமக்கள் உதவி எண்',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'உள்கட்டமைப்பு அல்லது பொது பிரச்சனையை பதிவு செய்க',
    formSubtitle: 'உங்கள் புகார் அதிகாரப்பூர்வ டிக்கெட் எண்ணுடன் நேரடியாக சம்பந்தப்பட்ட துறைக்கு அனுப்பப்படும்.',
    photoLabel: 'புகைப்பட சான்று (விருப்பத்திற்குரியது)',
    photoHint: 'புகைப்படம் எடுக்கவும் அல்லது பதிவேற்றவும்.',
    photoUploaded: 'புகைப்படம் வெற்றிகரமாக இணைக்கப்பட்டது',
    takePhoto: 'புகைப்படம் சேர்க்க',
    descriptionLabel: 'பிரச்சனை பற்றிய விவரம்',
    descriptionPlaceholder: 'எ.கா., சாலையில் பெரிய பள்ளம், குடிநீர் குழாய் உடைந்து நீர் வீணாகிறது, தெருவிளக்கு எரியவில்லை...',
    listening: 'உங்கள் குரலைக் கேட்கிறது...',
    startVoice: 'குரல் மூலம் சொல்லுங்கள்',
    stopVoice: 'நிறுத்துக',
    detectedCategory: 'தானியங்கி பிரிவு கண்டறிதல்',
    autoDetected: 'சொற்கள் மூலம் கண்டறியப்பட்டது',
    categoryLabel: 'பிரச்சனை வகை',
    categoryManualNotice: 'சரியான துறைக்கு அனுப்ப வகையைத் தேர்ந்தெடுக்கவும்:',
    locationLabel: 'இடம் அல்லது முகவரி',
    locationPlaceholder: 'எ.கா., அண்ணா நகர் 2வது தெரு, தபால் நிலையம் அருகில்',
    useMyLocation: 'என் GPS இருப்பிடத்தைப் பயன்படுத்து',
    locating: 'இருப்பிடம் தேடப்படுகிறது...',
    locationFound: 'இருப்பிடம் பெறப்பட்டது',
    citizenNameLabel: 'உங்கள் பெயர் (விருப்பத்திற்குரியது)',
    citizenNamePlaceholder: 'எ.கா., சுப்பிரமணியன்',
    citizenPhoneLabel: 'அலைபேசி எண் (SMS பெற)',
    citizenPhonePlaceholder: 'எ.கா., 9840123456',
    urgencyLabel: 'அவசர நிலை',
    urgencyNormal: 'சாதாரண',
    urgencyHigh: 'அதிகம் (பாதுகாப்பு அச்சுறுத்தல்)',
    urgencyCritical: 'அவசரம் / உடனடி தேவை',
    submitButton: 'அதிகாரப்பூர்வ புகாரை சமர்ப்பிக்க',
    submitting: 'பதிவாகிறது...',
    successMessage: 'புகார் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!',

    routingHeader: 'தானியங்கி துறை வழிகாட்டல் முன்னோட்டம்',
    routingDept: 'ஒதுக்கப்பட்ட துறை',
    slaHeader: 'அதிகாரப்பூர்வ தீர்வு கால அளவு (SLA)',
    slaHoursUnit: 'மணி நேர இலக்கு',
    contactLine: 'உதவி எண்',
    officerLine: 'பொறுப்பு பொறியாளர்',
    routingNotice: 'உங்கள் விளக்கத்தின் அடிப்படையில் இப்புகார் உடனடியாக இந்தத் துறைக்கு அனுப்பப்படும்.',

    trackingTitle: 'பதிவு செய்யப்பட்ட புகார்கள்',
    searchPlaceholder: 'டிக்கெட் எண் (CVC-2026) அல்லது முகவரி தேடவும்...',
    filterAll: 'அனைத்து நிலைகளும்',
    filterSubmitted: 'சமர்ப்பிக்கப்பட்டது',
    filterAcknowledged: 'ஏற்றுக்கொள்ளப்பட்டது',
    filterInProgress: 'பணி நடக்கிறது',
    filterResolved: 'தீர்க்கப்பட்டது',
    noReportsFound: 'எந்தப் புகாரும் காணப்படவில்லை.',
    ticketId: 'டிக்கெட் குறிப்பு எண்',
    reportedOn: 'பதிவு செய்த நாள்',
    department: 'துறை',
    advanceStatusDemo: 'நிலையை மாற்று (டெமோ)',
    advanceTo: 'அடுத்த நிலைக்கு:',
    viewReceipt: 'ரசீதை அச்சிடுக',
    resolvedBadge: 'தீர்க்கப்பட்டது',
    inProgressBadge: 'பணி நடக்கிறது',
    acknowledgedBadge: 'ஏற்கப்பட்டது',
    submittedBadge: 'பதிவானது',

    mapTitle: 'குடிமக்கள் நேரலை வரைபடம்',
    mapSubtitle: 'நகரம் முழுவதும் உள்ள புகார்கள் மற்றும் பராமரிப்புக் குழுக்களின் வரைபடம்.',
    mapLegend: 'குறியீட்டு விளக்கம்',
    centerLocation: 'என் பகுதியை பார்க்க',
    filterByDept: 'துறை வாரியாக வடிகட்டு',

    officerDashboard: 'மாநகராட்சி பணிச்சுமை & SLA கண்காணிப்பு',
    totalComplaints: 'மொத்த புகார்கள்',
    pendingReview: 'பரிசீலனையில் உள்ளவை',
    underExecution: 'களப்பணி நடப்பவை',
    resolvedTotal: 'தீர்க்கப்பட்டவை',
    slaAdherence: 'SLA நிறைவேற்ற வீதம்',
    actionRequired: 'அதிகாரி நடவடிக்கைகள்',
    dispatchCrew: 'பழுதுபார்க்கும் குழுவை அனுப்புக',
    addInspectionNote: 'கள ஆய்வுக் குறிப்பு சேர்க்க',
  },

  es: {
    portalTitle: 'PORTAL CÍVICO',
    portalSubtitle: 'Utilidad Municipal de Atención Ciudadana e Infraestructura',
    reportProblem: 'Reportar Problema',
    trackTickets: 'Rastrear Reportes',
    mapView: 'Mapa Cívico en Vivo',
    officerPortal: 'Portal de Autoridades',
    replitExport: 'Exportar HTML Autónomo',

    ageModeLabel: 'Modo de Visualización',
    standardMode: 'Ciudadano (Estándar)',
    standardModeDesc: 'Diseño optimizado de utilidad cívica con atajos y registro ágil.',
    seniorMode: 'Adulto Mayor (Texto Grande)',
    seniorModeDesc: 'Tipografía 125% mayor, alto contraste y dictado por voz sencillo.',
    officerMode: 'Personal Municipal (Revisión)',
    officerModeDesc: 'Panel administrativo para supervisar cargas de trabajo y notas de campo.',
    fontSize: 'Escala de Texto',
    textSizeNormal: 'Estándar',
    textSizeLarge: 'Grande (A+)',
    textSizeExtra: 'Máximo (A++)',
    seniorHelpNotice: '¿Necesita asistencia telefónica? Comuníquese a la línea gratuita para adultos mayores:',
    seniorVoiceHint: 'Presione "Hablar" para describir su reporte por voz sin escribir.',
    seniorHelplineTitle: 'Línea de Asistencia Cívica',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'Reportar una Incidencia Cívica o de Infraestructura',
    formSubtitle: 'Su reporte se registra con un código oficial y se canaliza directamente a la dependencia correspondiente.',
    photoLabel: 'Evidencia Fotográfica (Opcional)',
    photoHint: 'Arrastre una imagen o cargue una foto desde su dispositivo.',
    photoUploaded: 'Fotografía adjuntada con éxito',
    takePhoto: 'Agregar Foto',
    descriptionLabel: 'Descripción del Problema',
    descriptionPlaceholder: 'ej. Bache profundo en avenida principal, fuga de agua en banqueta, luminaria apagada...',
    listening: 'Escuchando su voz...',
    startVoice: 'Dictar por Voz',
    stopVoice: 'Detener',
    detectedCategory: 'Detección Automática de Categoría',
    autoDetected: 'Detectado mediante palabras clave',
    categoryLabel: 'Categoría del Reporte',
    categoryManualNotice: 'Seleccione una categoría para canalizar a la división correcta:',
    locationLabel: 'Ubicación / Referencia de Dirección',
    locationPlaceholder: 'ej. Av. Reforma 24, frente a la farmacia, Sector 4',
    useMyLocation: 'Usar mi Ubicación GPS',
    locating: 'Obteniendo GPS...',
    locationFound: 'Coordenadas obtenidas',
    citizenNameLabel: 'Su Nombre (Opcional)',
    citizenNamePlaceholder: 'ej. Carlos Morales',
    citizenPhoneLabel: 'Teléfono Móvil para SMS (Opcional)',
    citizenPhonePlaceholder: 'ej. +1 (555) 019-2834',
    urgencyLabel: 'Nivel de Urgencia',
    urgencyNormal: 'Normal',
    urgencyHigh: 'Alta (Riesgo vial/seguridad)',
    urgencyCritical: 'Crítica / Emergencia',
    submitButton: 'Enviar Reporte Oficial',
    submitting: 'Registrando folio...',
    successMessage: '¡Reporte Registrado Exitosamente!',

    routingHeader: 'Vista Previa del Enrutamiento Municipal',
    routingDept: 'Dependencia Asignada',
    slaHeader: 'Tiempo Límite Oficial de Resolución (SLA)',
    slaHoursUnit: 'Horas meta de atención',
    contactLine: 'Línea de Atención',
    officerLine: 'Encargado Zonal',
    routingNotice: 'Según su descripción, este reporte se asignará inmediatamente a este departamento al enviar.',

    trackingTitle: 'Historial de Reportes Registrados',
    searchPlaceholder: 'Buscar por Folio (ej. CVC-2026) o dirección...',
    filterAll: 'Todos los estados',
    filterSubmitted: 'Enviado',
    filterAcknowledged: 'Aceptado',
    filterInProgress: 'En Reparación',
    filterResolved: 'Resuelto',
    noReportsFound: 'No se encontraron reportes con ese criterio.',
    ticketId: 'Folio de Referencia',
    reportedOn: 'Fecha de Registro',
    department: 'Dependencia',
    advanceStatusDemo: 'Avanzar Estado (Demo)',
    advanceTo: 'Avanzar a',
    viewReceipt: 'Imprimir Comprobante',
    resolvedBadge: 'Resuelto',
    inProgressBadge: 'En Progreso',
    acknowledgedBadge: 'Aceptado',
    submittedBadge: 'Enviado',

    mapTitle: 'Mapa Cívico en Vivo',
    mapSubtitle: 'Distribución geográfica en tiempo real de incidencias vecinales y cuadrillas municipales.',
    mapLegend: 'Leyenda de Estados',
    centerLocation: 'Centrar en mi Zona',
    filterByDept: 'Filtrar por Dependencia',

    officerDashboard: 'Supervisión de Desempeño y SLA Municipal',
    totalComplaints: 'Total Recibidos',
    pendingReview: 'Pendientes de Revisión',
    underExecution: 'Cuadrillas en Terreno',
    resolvedTotal: 'Resueltos en SLA',
    slaAdherence: 'Tasa de Cumplimiento',
    actionRequired: 'Acciones de Oficial',
    dispatchCrew: 'Despachar Cuadrilla',
    addInspectionNote: 'Registrar Nota de Inspección',
  },

  te: {
    portalTitle: 'పౌర సేవా వేదిక',
    portalSubtitle: 'మున్సిపల్ ప్రజా ఫిర్యాదుల పరిష్కార వ్యవస్థ',
    reportProblem: 'సమస్యను నివేదించండి',
    trackTickets: 'ఫిర్యాదును ట్రాక్ చేయండి',
    mapView: 'లైవ్ మ్యాప్',
    officerPortal: 'అధికారుల పోర్టల్',
    replitExport: 'HTML డౌన్‌లోడ్',

    ageModeLabel: 'డిస్ప్లే మోడ్',
    standardMode: 'పౌరుడు (సాధారణ)',
    standardModeDesc: 'వేగవంతమైన మరియు అనుకూలమైన ఫిర్యాదు నమోదు లేఅవుట్.',
    seniorMode: 'సీనియర్ సిటిజన్ (పెద్ద అక్షరాలు)',
    seniorModeDesc: '125% పెద్ద ఫాంట్, సులభమైన వాయిస్ రికార్డింగ్ సదుపాయం.',
    officerMode: 'మున్సిపల్ సిబ్బంది (సమీక్ష)',
    officerModeDesc: 'ఫిర్యాదుల సమీక్ష మరియు ఫీల్డ్ వర్క్ అప్‌డేట్ డాష్‌బోర్డ్.',
    fontSize: 'ఫాంట్ పరిమాణం',
    textSizeNormal: 'సాధారణ',
    textSizeLarge: 'పెద్దది (A+)',
    textSizeExtra: 'గరిష్ట (A++)',
    seniorHelpNotice: 'ఫోన్ సహాయం కావాలా? మా 24 గంటల టోల్ ఫ్రీ సీనియర్ సిటిజన్ హెల్ప్‌డెస్క్‌ని సంప్రదించండి:',
    seniorVoiceHint: 'టైప్ చేయకుండా మాట్లాడటానికి "మాట్లాడండి" నొక్కండి.',
    seniorHelplineTitle: 'సీనియర్ సిటిజన్ హెల్ప్‌లైన్',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'రోడ్లు, పారిశుద్ధ్యం లేదా విద్యుత్ సమస్యను నమోదు చేయండి',
    formSubtitle: 'మీ ఫిర్యాదు అధికారిక టికెట్ నంబర్‌తో నమోదు చేయబడి సంబంధిత విభాగానికి పంపబడుతుంది.',
    photoLabel: 'ఫోటో సాక్ష్యం (ఐచ్ఛికం)',
    photoHint: 'ఫోటోను జోడించండి లేదా కెమెరాతో తీయండి.',
    photoUploaded: 'ఫోటో విజయవంతంగా జోడించబడింది',
    takePhoto: 'ఫోటో తీయండి',
    descriptionLabel: 'సమస్య వివరాలు',
    descriptionPlaceholder: 'ఉదా. రోడ్డుపై పెద్ద గుంత, డ్రైనేజీ లీకేజీ, వీధి దీపం వెలగడం లేదు...',
    listening: 'మీ వాయిస్ రికార్డ్ అవుతోంది...',
    startVoice: 'వాయిస్‌తో చెప్పండి',
    stopVoice: 'ఆపండి',
    detectedCategory: 'ఆటోమేటిక్ కేటగిరీ గుర్తింపు',
    autoDetected: 'కీవర్డ్‌ల ద్వారా గుర్తించబడింది',
    categoryLabel: 'సమస్య విభాగం',
    categoryManualNotice: 'సరైన విభాగానికి పంపడానికి వర్గాన్ని ఎంచుకోండి:',
    locationLabel: 'స్థలం లేదా చిరునామా',
    locationPlaceholder: 'ఉదా. గాంధీ రోడ్డు, బ్యాంక్ దగ్గర, వార్డ్ 12',
    useMyLocation: 'నా GPS లొకేషన్ ఉపయోగించండి',
    locating: 'లొకేషన్ శోధిస్తోంది...',
    locationFound: 'లొకేషన్ కనుగొనబడింది',
    citizenNameLabel: 'మీ పేరు (ఐచ్ఛికం)',
    citizenNamePlaceholder: 'ఉదా. శ్రీనివాస్',
    citizenPhoneLabel: 'మొబైల్ నంబర్ (SMS అప్‌డేట్‌ల కోసం)',
    citizenPhonePlaceholder: 'ఉదా. 9849012345',
    urgencyLabel: 'తీవ్రత స్థాయి',
    urgencyNormal: 'సాధారణ',
    urgencyHigh: 'అధిక (ప్రమాదకరం)',
    urgencyCritical: 'అత్యవసరం',
    submitButton: 'అధికారిక ఫిర్యాదును సమర్పించండి',
    submitting: 'నమోదు అవుతోంది...',
    successMessage: 'ఫిర్యాదు విజయవంతంగా నమోదైంది!',

    routingHeader: 'ఆటోమేటిక్ డిపార్ట్‌మెంట్ రూటింగ్ ప్రివ్యూ',
    routingDept: 'కేటాయించిన విభాగం',
    slaHeader: 'పరిష్కార గడువు (SLA)',
    slaHoursUnit: 'గంటల లక్ష్యం',
    contactLine: 'హెల్ప్‌లైన్ నంబర్',
    officerLine: 'ఇన్‌చార్జ్ అధికారి',
    routingNotice: 'మీ వివరాల ఆధారంగా ఈ ఫిర్యాదు వెంటనే సంబంధిత మున్సిపల్ విభాగానికి చేరుతుంది.',

    trackingTitle: 'నమోదైన ఫిర్యాదులు',
    searchPlaceholder: 'టికెట్ నంబర్ లేదా లొకేషన్ శోధించండి...',
    filterAll: 'అన్ని స్థితులు',
    filterSubmitted: 'నమోదైనవి',
    filterAcknowledged: 'స్వీకరించినవి',
    filterInProgress: 'పని జరుగుతోంది',
    filterResolved: 'పరిష్కరించబడినవి',
    noReportsFound: 'ఎలాంటి ఫిర్యాదులు కనుగొనబడలేదు.',
    ticketId: 'టికెట్ రెఫరెన్స్ నంబర్',
    reportedOn: 'నమోదైన తేదీ',
    department: 'విభాగం',
    advanceStatusDemo: 'స్టేటస్ ముందుకు మార్చండి (డెమో)',
    advanceTo: 'తదుపరి స్థితి:',
    viewReceipt: 'రసీదు ప్రింట్ చేయండి',
    resolvedBadge: 'పరిష్కరించబడింది',
    inProgressBadge: 'పని జరుగుతోంది',
    acknowledgedBadge: 'స్వీకరించబడింది',
    submittedBadge: 'నమోదైంది',

    mapTitle: 'పౌర లైవ్ మ్యాప్',
    mapSubtitle: 'నగరవ్యాప్తంగా నమోదైన సమస్యలు మరియు సిబ్బంది సమాచారం.',
    mapLegend: 'స్టేటస్ సూచికలు',
    centerLocation: 'నా లొకేషన్ చూపించు',
    filterByDept: 'డిపార్ట్‌మెంట్ ప్రకారం ఫిల్టర్ చేయండి',

    officerDashboard: 'మున్సిపల్ వర్క్‌లోడ్ & SLA పర్యవేక్షణ',
    totalComplaints: 'మొత్తం ఫిర్యాదులు',
    pendingReview: 'సమీక్షలో ఉన్నవి',
    underExecution: 'ఫీల్డ్ బృందాలు నియమించబడ్డాయి',
    resolvedTotal: 'పరిష్కరించబడినవి',
    slaAdherence: 'SLA సాధన శాతం',
    actionRequired: 'అధికారి చర్యలు',
    dispatchCrew: 'రిపేర్ బృందాన్ని పంపండి',
    addInspectionNote: 'ఫీల్డ్ ఇన్స్పెక్షన్ నోట్ రాయండి',
  },

  bn: {
    portalTitle: 'নাগরিক সেবা পোর্টাল',
    portalSubtitle: 'পৌর জন অভিযোগ প্রতিকার ও পরিকাঠামো পরিষেবা',
    reportProblem: 'সমস্যা জানান',
    trackTickets: 'অভিযোগ ট্র্যাক করুন',
    mapView: 'লাইভ ম্যাপ',
    officerPortal: 'অফিসার পোর্টাল',
    replitExport: 'HTML ডাউনলোড করুন',

    ageModeLabel: 'ডিসপ্লে মোড',
    standardMode: 'নাগরিক (সাধারণ)',
    standardModeDesc: 'দ্রুত অভিযোগ দাখিল করার কার্যকরী ইন্টারফেস।',
    seniorMode: 'প্রবীণ নাগরিক (বড় ফন্ট)',
    seniorModeDesc: '১২৫% বড় লেখা, উচ্চ বৈসাদৃশ্য এবং সহজে ভয়েস দিয়ে অভিযোগ নথিভুক্ত করুন।',
    officerMode: 'পৌর আধিকারিক (পর্যালোচনা)',
    officerModeDesc: 'অভিযোগ পর্যালোচনা এবং কাজের অগ্রগতি নথিভুক্ত করার ড্যাশবোর্ড।',
    fontSize: 'ফন্টের আকার',
    textSizeNormal: 'সাধারণ',
    textSizeLarge: 'বড় (A+)',
    textSizeExtra: 'সর্বোচ্চ (A++)',
    seniorHelpNotice: 'ফোনে সাহায্য চান? আমাদের ২৪ ঘণ্টার বিনামূল্যে প্রবীণ নাগরিক সহায়তা কেন্দ্রে ফোন করুন:',
    seniorVoiceHint: 'টাইপ না করে মুখে বলতে "বলুন" বোতামে চাপ দিন।',
    seniorHelplineTitle: 'প্রবীণ নাগরিক হেল্পলাইন',
    seniorHelplineNumber: '1800-11-2356',

    formTitle: 'রাস্তা, আবর্জনা বা বিদ্যুৎ সংক্রান্ত সমস্যা জানান',
    formSubtitle: 'আপনার অভিযোগ একটি অফিসিয়াল টিকিট নম্বরসহ অবিলম্বে সংশ্লিষ্ট পৌর বিভাগে পাঠানো হবে।',
    photoLabel: 'ছবির প্রমাণ (ঐচ্ছিক)',
    photoHint: 'ছবি তুলুন বা ডিভাইস থেকে আপলোড করুন।',
    photoUploaded: 'ছবি সফলভাবে সংযুক্ত হয়েছে',
    takePhoto: 'ছবি তুলুন',
    descriptionLabel: 'সমস্যার বিবরণ',
    descriptionPlaceholder: 'যেমন: প্রধান রাস্তায় বড় গর্ত, নর্দমার জল উপচে পড়ছে, স্ট্রিট লাইট জ্বলছে না...',
    listening: 'আপনার কথা শোনা হচ্ছে...',
    startVoice: 'মুখে বলুন',
    stopVoice: 'থামুন',
    detectedCategory: 'স্বয়ংক্রিয় বিভাগ সনাক্তকরণ',
    autoDetected: 'কীওয়ার্ড দ্বারা সনাক্ত করা হয়েছে',
    categoryLabel: 'সমস্যার ধরন',
    categoryManualNotice: 'সঠিক বিভাগে পাঠানোর জন্য ধরন নির্বাচন করুন:',
    locationLabel: 'স্থান বা নিকটবর্তী ঠিকানা',
    locationPlaceholder: 'যেমন: কলেজ স্ট্রিট, ডাকঘরের কাছে, ওয়ার্ড ১২',
    useMyLocation: 'আমার GPS অবস্থান ব্যবহার করুন',
    locating: 'GPS অনুসন্ধান করা হচ্ছে...',
    locationFound: 'অবস্থান পাওয়া গেছে',
    citizenNameLabel: 'আপনার নাম (ঐচ্ছিক)',
    citizenNamePlaceholder: 'যেমন: অমিতাভ সেন',
    citizenPhoneLabel: 'মোবাইল নম্বর (SMS পাওয়ার জন্য)',
    citizenPhonePlaceholder: 'যেমন: ৯৮৩০০১২৩৪৫',
    urgencyLabel: 'জরুরি মাত্রা',
    urgencyNormal: 'সাধারণ',
    urgencyHigh: 'উচ্চ (নিরাপত্তা ঝুঁকি)',
    urgencyCritical: 'জরুরি / বিপজ্জনক',
    submitButton: 'অফিসিয়াল অভিযোগ জমা দিন',
    submitting: 'জমা হচ্ছে...',
    successMessage: 'অভিযোগ সফলভাবে নথিভুক্ত হয়েছে!',

    routingHeader: 'স্বয়ংক্রিয় বিভাগীয় রাউটিং পূর্বাভাস',
    routingDept: 'নির্ধারিত বিভাগ',
    slaHeader: 'অফিসিয়াল সমাধানের সময়সীমা (SLA)',
    slaHoursUnit: 'ঘণ্টা লক্ষ্যমাত্রা',
    contactLine: 'হেল্পলাইন নম্বর',
    officerLine: 'দায়িত্বপ্রাপ্ত আধিকারিক',
    routingNotice: 'আপনার বিবরণ অনুসারে এই অভিযোগটি অবিলম্বে এই পৌর বিভাগে প্রেরিত হবে।',

    trackingTitle: 'নথিভুক্ত অভিযোগের তালিকা',
    searchPlaceholder: 'টিকিট নম্বর (CVC-2026) বা ঠিকানা খুঁজুন...',
    filterAll: 'সকল অবস্থা',
    filterSubmitted: 'দাখিল করা হয়েছে',
    filterAcknowledged: 'গৃহীত হয়েছে',
    filterInProgress: 'কাজ চলছে',
    filterResolved: 'সমাধান হয়েছে',
    noReportsFound: 'কোনো অভিযোগের তথ্য পাওয়া যায়নি।',
    ticketId: 'টিকিট নম্বর',
    reportedOn: 'দাখিলের তারিখ',
    department: 'বিভাগ',
    advanceStatusDemo: 'পরবর্তী অবস্থা (ডেমো)',
    advanceTo: 'পরবর্তী ধাপ:',
    viewReceipt: 'রসিদ প্রিন্ট করুন',
    resolvedBadge: 'সমাধান হয়েছে',
    inProgressBadge: 'কাজ চলছে',
    acknowledgedBadge: 'গৃহীত',
    submittedBadge: 'দাখিল',

    mapTitle: 'নাগরিক লাইভ ম্যাপ',
    mapSubtitle: 'শহরজুড়ে সমস্যার রিয়েল-টাইম মানচিত্র এবং রক্ষণাবেক্ষণ দলের অবস্থান।',
    mapLegend: 'চিহ্ন বিবরণী',
    centerLocation: 'আমার এলাকা দেখুন',
    filterByDept: 'বিভাগ অনুযায়ী ফিল্টার',

    officerDashboard: 'পৌর কাজের চাপ ও SLA ট্র্যাকার',
    totalComplaints: 'মোট প্রাপ্ত অভিযোগ',
    pendingReview: 'পর্যালোচনার জন্য অপেক্ষমাণ',
    underExecution: 'মাঠে কর্মী নিযুক্ত',
    resolvedTotal: 'সময়মতো সমাধান হয়েছে',
    slaAdherence: 'SLA পূরণের হার',
    actionRequired: 'আধিকারিকের দ্রুত পদক্ষেপ',
    dispatchCrew: 'মেরামত দল পাঠান',
    addInspectionNote: 'পরিদর্শন মন্তব্য লিখুন',
  },
};
