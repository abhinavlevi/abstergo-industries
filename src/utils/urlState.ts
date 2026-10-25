import { EmployeeBadge } from '../types/badge';

export function encodeBadgeToUrl(badge: EmployeeBadge): string {
  try {
    const minified = {
      n: badge.fullName,
      r: badge.roleTitle,
      d: badge.department,
      c: badge.clearanceLevel,
      b: badge.badgeNumber,
      s: badge.securityString,
      i: badge.issueDate,
      e: badge.expiryDate,
      bt: badge.bloodType,
      dna: badge.dnaMarker,
      p: badge.photoUrl.startsWith('data:') ? '' : badge.photoUrl,
      z: badge.photoTransform.zoom,
      px: badge.photoTransform.panX,
      py: badge.photoTransform.panY,
      l: badge.layout,
    };
    const json = JSON.stringify(minified);
    const b64 = btoa(encodeURIComponent(json));
    const url = new URL(window.location.href);
    url.hash = `id=${b64}`;
    return url.toString();
  } catch {
    return window.location.href;
  }
}

export function decodeBadgeFromUrl(defaultBadge: EmployeeBadge): EmployeeBadge {
  try {
    if (typeof window === 'undefined') return defaultBadge;
    const hash = window.location.hash;
    if (!hash || !hash.includes('id=')) return defaultBadge;

    const b64 = hash.split('id=')[1]?.split('&')[0];
    if (!b64) return defaultBadge;

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
  } catch (e) {
    console.warn('Failed to decode badge from URL hash:', e);
    return defaultBadge;
  }
}
