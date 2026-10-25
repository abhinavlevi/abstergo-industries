import { EmployeeBadge, ClearanceLevel, CardLayout } from '../types/badge';
import { PRESETS, DEFAULT_BADGE } from '../data/presets';

export function encodeBadgeToUrl(badge: EmployeeBadge): string {
  try {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    // Check if the badge corresponds to a known preset
    const matchingPreset = PRESETS.find(
      (p) => p.name === badge.fullName && p.badgeNumber === badge.badgeNumber
    );

    if (matchingPreset) {
      params.set('p', matchingPreset.id);

      // Only serialize differences from the preset
      if (badge.roleTitle !== matchingPreset.role) {
        params.set('r', badge.roleTitle);
      }
      if (badge.department !== matchingPreset.department) {
        params.set('d', badge.department);
      }
      if (badge.clearanceLevel !== matchingPreset.clearance) {
        params.set('c', badge.clearanceLevel);
      }
      if (badge.layout !== 'vertical') {
        params.set('l', 'h');
      }
      if (badge.photoTransform.zoom !== 1.0) {
        params.set('z', badge.photoTransform.zoom.toString());
      }
      if (badge.photoTransform.panX !== 0) {
        params.set('x', badge.photoTransform.panX.toString());
      }
      if (badge.photoTransform.panY !== 0) {
        params.set('y', badge.photoTransform.panY.toString());
      }
    } else {
      // Custom badge: concise parameters
      if (badge.fullName) params.set('n', badge.fullName);
      if (badge.roleTitle) params.set('r', badge.roleTitle);
      if (badge.department && badge.department !== DEFAULT_BADGE.department) {
        params.set('d', badge.department);
      }
      if (badge.clearanceLevel && badge.clearanceLevel !== DEFAULT_BADGE.clearanceLevel) {
        params.set('c', badge.clearanceLevel);
      }
      if (badge.badgeNumber) params.set('b', badge.badgeNumber);
      if (badge.securityString && badge.securityString !== badge.badgeNumber) {
        params.set('s', badge.securityString);
      }
      if (badge.bloodType && badge.bloodType !== DEFAULT_BADGE.bloodType) {
        params.set('bt', badge.bloodType);
      }
      if (badge.dnaMarker && badge.dnaMarker !== DEFAULT_BADGE.dnaMarker) {
        params.set('dna', badge.dnaMarker);
      }
      if (badge.layout !== 'vertical') {
        params.set('l', 'h');
      }
      if (badge.photoTransform.zoom !== 1.0) {
        params.set('z', badge.photoTransform.zoom.toString());
      }
      if (badge.photoTransform.panX !== 0) {
        params.set('x', badge.photoTransform.panX.toString());
      }
      if (badge.photoTransform.panY !== 0) {
        params.set('y', badge.photoTransform.panY.toString());
      }
      // If photo is a relative preset URL, store it
      if (badge.photoUrl && !badge.photoUrl.startsWith('data:')) {
        params.set('img', badge.photoUrl);
      }
    }

    url.hash = params.toString();
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function decodeBadgeFromUrl(defaultBadge: EmployeeBadge): EmployeeBadge {
  try {
    if (typeof window === 'undefined') return defaultBadge;
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) return defaultBadge;

    const rawHash = hash.replace(/^#/, '');

    // Backward compatibility: Legacy base64 'id=' payload
    if (rawHash.startsWith('id=')) {
      const b64 = rawHash.split('id=')[1]?.split('&')[0];
      if (b64) {
        const json = decodeURIComponent(atob(b64));
        const data = JSON.parse(json);
        return {
          fullName: data.n ?? defaultBadge.fullName,
          roleTitle: data.r ?? defaultBadge.roleTitle,
          department: data.d ?? defaultBadge.department,
          clearanceLevel: data.c ?? defaultBadge.clearanceLevel,
          badgeNumber: data.b ?? defaultBadge.badgeNumber,
          securityString: data.s ?? defaultBadge.securityString,
          issueDate: data.i ?? defaultBadge.issueDate,
          expiryDate: data.e ?? defaultBadge.expiryDate,
          bloodType: data.bt ?? defaultBadge.bloodType,
          dnaMarker: data.dna ?? defaultBadge.dnaMarker,
          photoUrl: data.p || defaultBadge.photoUrl,
          photoTransform: {
            zoom: data.z ?? defaultBadge.photoTransform.zoom,
            panX: data.px ?? defaultBadge.photoTransform.panX,
            panY: data.py ?? defaultBadge.photoTransform.panY,
          },
          layout: data.l ?? defaultBadge.layout,
        };
      }
    }

    // Modern compact URLSearchParams
    const params = new URLSearchParams(rawHash);

    // Preset base if 'p' is provided
    let baseBadge = defaultBadge;
    const presetId = params.get('p');
    if (presetId) {
      const matched = PRESETS.find((pr) => pr.id === presetId);
      if (matched) {
        baseBadge = {
          fullName: matched.name,
          roleTitle: matched.role,
          department: matched.department,
          clearanceLevel: matched.clearance,
          badgeNumber: matched.badgeNumber,
          securityString: matched.securityString,
          issueDate: defaultBadge.issueDate,
          expiryDate: defaultBadge.expiryDate,
          bloodType: matched.bloodType,
          dnaMarker: matched.dnaMarker,
          photoUrl: matched.photoUrl,
          photoTransform: { zoom: 1.0, panX: 0, panY: 0 },
          layout: 'vertical',
        };
      }
    }

    // Layout
    const layoutParam = params.get('l');
    const layout: CardLayout = layoutParam === 'h' ? 'horizontal' : 'vertical';

    return {
      fullName: params.get('n') ?? baseBadge.fullName,
      roleTitle: params.get('r') ?? baseBadge.roleTitle,
      department: params.get('d') ?? baseBadge.department,
      clearanceLevel: (params.get('c') as ClearanceLevel) ?? baseBadge.clearanceLevel,
      badgeNumber: params.get('b') ?? baseBadge.badgeNumber,
      securityString: params.get('s') ?? baseBadge.securityString,
      issueDate: params.get('i') ?? baseBadge.issueDate,
      expiryDate: params.get('e') ?? baseBadge.expiryDate,
      bloodType: params.get('bt') ?? baseBadge.bloodType,
      dnaMarker: params.get('dna') ?? baseBadge.dnaMarker,
      photoUrl: params.get('img') ?? baseBadge.photoUrl,
      photoTransform: {
        zoom: params.has('z') ? parseFloat(params.get('z')!) : baseBadge.photoTransform.zoom,
        panX: params.has('x') ? parseFloat(params.get('x')!) : baseBadge.photoTransform.panX,
        panY: params.has('y') ? parseFloat(params.get('y')!) : baseBadge.photoTransform.panY,
      },
      layout,
    };
  } catch (e) {
    console.warn('Failed to decode badge from URL:', e);
    return defaultBadge;
  }
}
