import { CivicCategory, DepartmentInfo } from '../types';

export const DEPARTMENTS: Record<CivicCategory, DepartmentInfo> = {
  pothole: {
    id: 'pwd_roads',
    name: 'Public Works & Roads Maintenance Division',
    code: 'PWD-RD',
    slaHours: 48,
    contactNumber: '1800-425-7623',
    officerInCharge: 'Er. R. K. Sharma (Superintending Engineer)',
    icon: 'Hammer',
  },
  garbage: {
    id: 'solid_waste',
    name: 'Solid Waste & Sanitation Department',
    code: 'SWD-SAN',
    slaHours: 24,
    contactNumber: '1800-425-9988',
    officerInCharge: 'Dr. Anita Deshmukh (Chief Health & San. Officer)',
    icon: 'Trash2',
  },
  streetlight: {
    id: 'electrical_board',
    name: 'Municipal Electricity & Streetlighting Board',
    code: 'MESB-LT',
    slaHours: 24,
    contactNumber: '1800-425-3312',
    officerInCharge: 'Er. Sandeep Nair (Executive Engineer Electrical)',
    icon: 'Lightbulb',
  },
  water_drainage: {
    id: 'water_sewerage',
    name: 'Water Supply & Sewerage Board',
    code: 'WSSB-OPS',
    slaHours: 36,
    contactNumber: '1800-425-4420',
    officerInCharge: 'Er. Priya Swaminathan (Zonal Hydraulic Engineer)',
    icon: 'Droplets',
  },
  traffic_sign: {
    id: 'traffic_transit',
    name: 'Traffic Safety & Signals Department',
    code: 'TSSD-SIG',
    slaHours: 48,
    contactNumber: '1800-425-8811',
    officerInCharge: 'Insp. Vikram Rathore (Civic Transit Wing)',
    icon: 'AlertTriangle',
  },
  parks_trees: {
    id: 'horticulture',
    name: 'Horticulture, Parks & Urban Forestry Wing',
    code: 'HORT-GRN',
    slaHours: 72,
    contactNumber: '1800-425-5567',
    officerInCharge: 'Smt. Maya Pillai (Deputy Dir. Horticulture)',
    icon: 'Trees',
  },
  other: {
    id: 'general_grievance',
    name: 'Citizen Grievance Redressal Cell',
    code: 'CGRC-GEN',
    slaHours: 72,
    contactNumber: '1800-425-1000',
    officerInCharge: 'Shri Arvind Joshi (Grievance Redressal Commissioner)',
    icon: 'HelpCircle',
  },
};

export interface CategoryOption {
  key: CivicCategory;
  labelEn: string;
  keywords: string[];
  icon: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    key: 'pothole',
    labelEn: 'Roads & Potholes',
    keywords: ['pothole', 'road', 'asphalt', 'crater', 'crack', 'ditch', 'tar', 'bump', 'street damage', 'pavement', 'gadda', 'sadak'],
    icon: 'ShieldAlert',
  },
  {
    key: 'garbage',
    labelEn: 'Solid Waste & Sanitation',
    keywords: ['garbage', 'trash', 'waste', 'dump', 'dustbin', 'litter', 'rubbish', 'stench', 'smell', 'kachra', 'safai', 'bin'],
    icon: 'Trash2',
  },
  {
    key: 'streetlight',
    labelEn: 'Streetlight & Electrical',
    keywords: ['streetlight', 'light', 'lamp', 'dark', 'bulb', 'wire', 'pole', 'electric', 'short circuit', 'bijli', 'batti', 'transformer'],
    icon: 'Lightbulb',
  },
  {
    key: 'water_drainage',
    labelEn: 'Water Supply & Drainage',
    keywords: ['water', 'pipe', 'leak', 'drain', 'sewage', 'gutter', 'overflow', 'tap', 'flood', 'pani', 'naali', 'clog', 'burst'],
    icon: 'Droplets',
  },
  {
    key: 'traffic_sign',
    labelEn: 'Traffic & Signage',
    keywords: ['traffic', 'signal', 'stop sign', 'board', 'zebra', 'crossing', 'speed breaker', 'barrier', 'bollard'],
    icon: 'AlertTriangle',
  },
  {
    key: 'parks_trees',
    labelEn: 'Parks & Fallen Trees',
    keywords: ['tree', 'branch', 'fallen', 'park', 'grass', 'bench', 'playground', 'greenery', 'overgrown', 'paudh'],
    icon: 'Trees',
  },
];

export function detectCategoryFromText(text: string): CivicCategory | null {
  if (!text || text.trim().length < 3) return null;
  const lower = text.toLowerCase();

  for (const cat of CATEGORY_OPTIONS) {
    for (const kw of cat.keywords) {
      if (lower.includes(kw)) {
        return cat.key;
      }
    }
  }
  return null;
}
