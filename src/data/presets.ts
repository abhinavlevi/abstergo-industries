import { EmployeePreset, EmployeeBadge } from '../types/badge';

export const PRESETS: EmployeePreset[] = [
  {
    id: 'lucy',
    name: 'Lucy Stillman',
    role: 'Genetic Memory Researcher',
    clearance: 'Sector Alpha',
    badgeNumber: 'AS-0006-0986',
    department: 'Animus Research / Lineage Div.',
    securityString: 'animus 0006-0986',
    bloodType: 'A+',
    dnaMarker: 'ISO-88A-PRECURSOR',
    photoUrl: '/presets/lucy_stillman.png',
    defaultZoom: 1.0,
    description: 'Senior Geneticist on the Animus Synchronizer'
  },
  {
    id: 'warren',
    name: 'Dr. Warren Vidic',
    role: 'Executive Research Director',
    clearance: 'Sector Master',
    badgeNumber: 'AS-0001-0001',
    department: 'Neuroscience & Memory Extraction',
    securityString: 'vidic-exec-0001',
    bloodType: 'O+',
    dnaMarker: 'HOM-SAPIENS-ALPHA',
    photoUrl: '/presets/warren_vidic.png',
    defaultZoom: 1.0,
    description: 'Head of Project Animus & Senior Research Director'
  },
  {
    id: 'alan',
    name: 'Alan Rikkin',
    role: 'Chief Executive Officer',
    clearance: 'Inner Sanctum',
    badgeNumber: 'AS-0000-0001',
    department: 'Executive Board & Global Operations',
    securityString: 'rikkin-sanctum-0000',
    bloodType: 'AB-',
    dnaMarker: 'TEMPLAR-COUNCIL-01',
    photoUrl: '/presets/alan_rikkin.png',
    defaultZoom: 1.0,
    description: 'Chief Executive Officer & Guardian of the Inner Sanctum'
  }
];

export const DEFAULT_BADGE: EmployeeBadge = {
  fullName: PRESETS[0].name,
  roleTitle: PRESETS[0].role,
  department: PRESETS[0].department,
  clearanceLevel: PRESETS[0].clearance,
  badgeNumber: PRESETS[0].badgeNumber,
  securityString: PRESETS[0].securityString,
  issueDate: '2012-09-02',
  expiryDate: '2028-09-01',
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
