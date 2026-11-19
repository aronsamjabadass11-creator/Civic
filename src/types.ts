export type ReportStatus = 'submitted' | 'acknowledged' | 'in_progress' | 'resolved';

export type CivicCategory = 
  | 'pothole'
  | 'garbage'
  | 'streetlight'
  | 'water_drainage'
  | 'traffic_sign'
  | 'parks_trees'
  | 'other';

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  slaHours: number;
  contactNumber: string;
  officerInCharge: string;
  icon: string;
}

export interface CivicReport {
  id: string; // e.g. CVC-2026-000101
  title: string;
  description: string;
  category: CivicCategory;
  department: DepartmentInfo;
  status: ReportStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  latitude: number;
  longitude: number;
  address: string;
  imageUrl?: string;
  citizenName?: string;
  citizenPhone?: string;
  urgency: 'low' | 'medium' | 'high';
  statusHistory: {
    status: ReportStatus;
    timestamp: string;
    note: string;
    officer?: string;
  }[];
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'es' | 'te' | 'bn';

export type UserAccessibilityMode = 'standard' | 'senior' | 'officer';

export type TextScale = 'normal' | 'large' | 'extra';
