export type CardLayout = 'vertical' | 'horizontal';
export type CardSide = 'front' | 'back';

export type ClearanceLevel = 
  | 'Sector Alpha' 
  | 'Sector Beta' 
  | 'Sector Gamma' 
  | 'Sector Master' 
  | 'Level 10 (Executive)' 
  | 'Level 9 (Senior)' 
  | 'Level 7 (Specialist)' 
  | 'Inner Sanctum';

export interface PhotoTransform {
  zoom: number; // 1.0 to 2.5
  panX: number; // -40 to 40 (%)
  panY: number; // -40 to 40 (%)
}

export interface EmployeeBadge {
  fullName: string;
  roleTitle: string;
  department: string;
  clearanceLevel: ClearanceLevel;
  badgeNumber: string;
  securityString: string;
  issueDate: string;
  expiryDate: string;
  bloodType: string;
  dnaMarker: string;
  photoUrl: string;
  photoTransform: PhotoTransform;
  layout: CardLayout;
}

export interface EmployeePreset {
  id: string;
  name: string;
  role: string;
  clearance: ClearanceLevel;
  badgeNumber: string;
  department: string;
  securityString: string;
  bloodType: string;
  dnaMarker: string;
  photoUrl: string;
  defaultZoom?: number;
  description: string;
}
