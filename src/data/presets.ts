import { EmployeePreset, EmployeeBadge } from '../types/badge';

export const PRESETS: EmployeePreset[] = [
  {
    id: 'lucy',
    name: 'Lucy Stillman',
    role: 'Genetic Research Scientist',
    clearance: 'Sector Alpha',
    badgeNumber: 'AS-0006-0986',
    department: 'Genetic Lineage & Memory Lab',
    securityString: 'animus 0006-0986',
    bloodType: 'A+',
    dnaMarker: 'ISO-88A-SEC',
    photoUrl: '/presets/lucy_stillman.png',
    defaultZoom: 1.0,
    description: 'Senior researcher leading genetic memory synchronization studies.'
  },
  {
    id: 'warren',
    name: 'Dr. Warren Vidic',
    role: 'Executive Research Director',
    clearance: 'Sector Master',
    badgeNumber: 'AS-0001-0001',
    department: 'Neuroscience & Memory Research',
    securityString: 'vidic-exec-0001',
    bloodType: 'O+',
    dnaMarker: 'HOM-ALPHA-01',
    photoUrl: '/presets/warren_vidic.png',
    defaultZoom: 1.0,
    description: 'Director of Neuroscience overseeing genetic exploration programs.'
  },
  {
    id: 'alan',
    name: 'Alan Rikkin',
    role: 'Chief Executive Officer',
    clearance: 'Level 10 (Executive)',
    badgeNumber: 'AS-0000-0001',
    department: 'Executive Board & Global Operations',
    securityString: 'rikkin-corp-0000',
    bloodType: 'AB-',
    dnaMarker: 'EXEC-BOARD-01',
    photoUrl: '/presets/alan_rikkin.png',
    defaultZoom: 1.0,
    description: 'Chief Executive Officer of Abstergo Industries.'
  }
];

export const DEFAULT_BADGE: EmployeeBadge = {
  fullName: PRESETS[0].name,
  roleTitle: PRESETS[0].role,
  department: PRESETS[0].department,
  clearanceLevel: PRESETS[0].clearance,
  badgeNumber: PRESETS[0].badgeNumber,
  securityString: PRESETS[0].securityString,
  issueDate: '2024-01-15',
  expiryDate: '2029-01-14',
  bloodType: PRESETS[0].bloodType,
  dnaMarker: PRESETS[0].dnaMarker,
  photoUrl: PRESETS[0].photoUrl,
  photoTransform: {
    zoom: 1.0,
    panX: 0,
    panY: 0,
  },
  layout: 'vertical',
};
