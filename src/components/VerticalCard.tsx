import React from 'react';
import { EmployeeBadge } from '../types/badge';
import { SmartChip } from './SmartChip';
import { Barcode } from './Barcode';
import { BrandMark } from './BrandMark';
import { HolographicSeal } from './HolographicSeal';
import { QRCodeSVG } from 'qrcode.react';
import { ShieldCheck, Wifi } from 'lucide-react';

interface VerticalCardProps {
  badge: EmployeeBadge;
  side: 'front' | 'back';
}

export const VerticalCard: React.FC<VerticalCardProps> = ({ badge, side }) => {
  const { zoom, panX, panY } = badge.photoTransform;

  // Determine clearance badge color
  const getClearanceStyle = (clearance: string) => {
    switch (clearance) {
      case 'Inner Sanctum':
      case 'Level 10 (Executive)':
        return {
          bg: 'bg-gradient-to-r from-red-800 to-rose-950',
          border: 'border-red-600',
          text: 'text-white',
          accent: '#DC2626'
        };
      case 'Sector Master':
        return {
          bg: 'bg-gradient-to-r from-amber-700 to-amber-900',
          border: 'border-amber-500',
          text: 'text-white',
          accent: '#D97706'
        };
      case 'Sector Alpha':
      default:
        return {
          bg: 'bg-[#C8381A]',
          border: 'border-[#9E2A13]',
          text: 'text-white',
          accent: '#C8381A'
        };
    }
  };

  const clStyle = getClearanceStyle(badge.clearanceLevel);

  if (side === 'back') {
    return (
      <div
        className="w-[320px] h-[490px] bg-[#F8FAFC] text-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xl border border-slate-300 select-none"
        style={{ width: '320px', height: '490px' }}
      >
        {/* Lanyard punch slot cutout */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3 bg-slate-300 rounded-full badge-slot z-20" />

        {/* Technical grid & watermark */}
        <div className="absolute inset-0 technical-grid pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
          <svg width="260" height="260" viewBox="0 0 100 100" fill="none">
            <polygon points="50,6 14,76 34,76 60,25" fill="#091E3A" />
            <polygon points="14,76 86,76 76,58 30,58" fill="#091E3A" />
            <polygon points="86,76 50,6 40,23 68,76" fill="#091E3A" />
          </svg>
        </div>

        {/* Top Magnetic Stripe */}
        <div className="mt-8">
          <div className="h-10 w-full magnetic-stripe relative flex items-center px-4">
            <div className="h-[2px] w-full bg-slate-800 opacity-40" />
          </div>
        </div>

        {/* Brandmark on back */}
        <div className="px-5 pt-2 flex items-center justify-between">
          <BrandMark variant="dark" size="sm" />
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-mono">
            <Wifi className="w-3.5 h-3.5 rotate-90 text-abstergo-navy" />
            <span>13.56 MHz RFID</span>
          </div>
        </div>

        {/* Signature Box */}
        <div className="px-5">
          <div className="text-[7.5px] uppercase font-mono tracking-wider text-slate-500 mb-0.5">
            Authorized Personnel Signature // Do Not Accept If Unsigned
          </div>
          <div className="h-8 bg-white border border-slate-300 rounded flex items-center px-3 font-serif italic text-slate-700 text-sm">
            {badge.fullName}
          </div>
        </div>

        {/* Center: Legal Disclaimer & Terms */}
        <div className="px-5 text-[7px] leading-tight text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800 uppercase tracking-wide">
            PROPERTY OF ABSTERGO INDUSTRIES • RESTRICTED ACCESS
          </p>
          <p>
            This credential remains the property of Abstergo Industries and must be returned upon termination of employment or immediately upon request by Corporate Security. Misuse, transfer, or unauthorized duplication is strictly prohibited under Internal Security Directive 11-A and applicable international statutes.
          </p>
          <p>
            If found, deposit in any mailbox or return directly to:
            <br />
            <span className="font-mono text-slate-700">Abstergo Industries Global Security, 1200 Market St, Philadelphia, PA 19107.</span>
          </p>
        </div>

        {/* Bottom Verification Strip with Hologram & QR */}
        <div className="px-5 pb-5">
          <div className="p-2.5 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HolographicSeal serialNumber={badge.badgeNumber} size="sm" />
              <div className="flex flex-col text-[8px] font-mono leading-tight">
                <span className="font-bold text-slate-900">{badge.badgeNumber}</span>
                <span className="text-slate-500">DNA: {badge.dnaMarker}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> SECURE
                </span>
              </div>
            </div>

            <div className="p-1 bg-white rounded border border-slate-200">
              <QRCodeSVG
                value={`https://abstergo.com/verify?id=${badge.badgeNumber}&clearance=${encodeURIComponent(badge.clearanceLevel)}`}
                size={44}
                level="M"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FRONT of Vertical Card
  return (
    <div
      className="w-[320px] h-[490px] bg-[#E2E8F0] text-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xl border border-slate-400 select-none"
      style={{ width: '320px', height: '490px' }}
    >
      {/* Top lanyard clip punch hole slot */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-slate-400 rounded-full badge-slot z-30" />

      {/* Subtle technical background grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-80" />

      {/* Large subtle Abstergo watermark in background - strict <= 5% opacity */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.045] pointer-events-none z-0">
        <svg width="290" height="290" viewBox="0 0 100 100" fill="none">
          <polygon points="50,6 14,76 34,76 60,25" fill="#091E3A" />
          <polygon points="14,76 86,76 76,58 30,58" fill="#091E3A" />
          <polygon points="86,76 50,6 40,23 68,76" fill="#091E3A" />
        </svg>
      </div>

      {/* Header section with Target Sensor Icon & Smart Chip */}
      <div className="relative z-10 pt-7 px-4">
        {/* Top tech markers */}
        <div className="flex items-center justify-between text-[8px] font-mono text-slate-500 border-b border-slate-300 pb-1 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-widest font-bold text-slate-700">ABSTERGO SEC-ID</span>
          </div>
          <span className="tracking-wider">SYS/02</span>
        </div>

        {/* Row with Photo on left, Name & Chip on right */}
        <div className="flex gap-3 items-start">
          {/* Framed Photo with Pan/Zoom positioning */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-[105px] h-[135px] bg-slate-300 border-2 border-slate-400 rounded-sm overflow-hidden relative shadow-inner">
              <img
                src={badge.photoUrl}
                alt={badge.fullName}
                className="w-full h-full object-cover origin-center transition-transform duration-75"
                style={{
                  transform: `scale(${zoom}) translate(${panX}%, ${panY}%)`,
                }}
                crossOrigin="anonymous"
              />
              {/* Corner tech reticle accents */}
              <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-white/60 pointer-events-none" />
              <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-white/60 pointer-events-none" />
              <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-white/60 pointer-events-none" />
              <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-white/60 pointer-events-none" />
            </div>

            {/* Micro barcode directly under photo (matches "animus 0006-0986" on canon card) */}
            <div className="w-[105px] mt-1 bg-white/70 px-1 py-0.5 rounded border border-slate-300">
              <Barcode
                value={badge.securityString || badge.badgeNumber}
                height={20}
                showText={true}
                textColor="#1E293B"
                altText={badge.securityString || badge.badgeNumber}
              />
            </div>
          </div>

          {/* Right Column: Smart Chip & Employee Name */}
          <div className="flex-1 flex flex-col justify-between h-[162px]">
            {/* Top row with Smart Chip and technical designation */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[7px] font-mono uppercase text-slate-500">SECTOR / LEVEL</span>
                <span className="text-[10px] font-mono font-bold text-slate-800">
                  {badge.clearanceLevel.toUpperCase()}
                </span>
              </div>
              <SmartChip size="sm" />
            </div>

            {/* Employee Name & Title */}
            <div className="mt-1">
              <h2
                className="text-[17px] font-extrabold tracking-tight text-slate-950 leading-tight break-words uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {badge.fullName}
              </h2>
              <p className="text-[10px] font-semibold text-slate-700 leading-tight mt-0.5">
                {badge.roleTitle}
              </p>
              <p className="text-[8.5px] font-mono text-slate-500 leading-tight mt-0.5">
                {badge.department}
              </p>
            </div>

            {/* Department info badge */}
            <div className="bg-white/80 p-1.5 rounded border border-slate-300 text-[8px] font-mono grid grid-cols-2 gap-1 text-slate-600">
              <div>
                <span className="text-[7px] block text-slate-400">BADGE ID</span>
                <span className="font-bold text-slate-800">{badge.badgeNumber}</span>
              </div>
              <div>
                <span className="text-[7px] block text-slate-400">BLOOD / DNA</span>
                <span className="font-bold text-slate-800">{badge.bloodType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Prominent Horizontal Clearance Banner (Canon "Clearance Sector Alpha") */}
      <div className="relative z-10 my-1">
        <div className={`w-full py-1.5 px-4 ${clStyle.bg} border-y ${clStyle.border} flex items-center justify-between shadow-sm`}>
          <div className="flex items-center gap-2">
            {/* White Abstergo Triangle */}
            <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
              <polygon points="50,6 14,76 34,76 60,25" fill="#FFF" />
              <polygon points="14,76 86,76 76,58 30,58" fill="#FFF" />
              <polygon points="86,76 50,6 40,23 68,76" fill="#FFF" />
            </svg>
            <span className="font-bold tracking-wider text-[11px] uppercase text-white font-sans drop-shadow-sm">
              Clearance {badge.clearanceLevel}
            </span>
          </div>

          <span className="text-[8px] font-mono text-white/80 tracking-widest uppercase">
            SEC/AUTH
          </span>
        </div>
      </div>

      {/* Dark Magnetic Stripe Section with Canon Microcode */}
      <div className="relative z-10 bg-[#1E242B] border-y border-slate-950 py-1.5 px-4 text-center">
        <div className="font-mono text-[7px] tracking-[0.25em] text-slate-400 select-all">
          34803-03102 • 0006-0986 • 102*0/8323 • ABST
        </div>
      </div>

      {/* Bottom Barcode with Canon Red Arrow */}
      <div className="relative z-10 px-4 pb-4 pt-1 bg-gradient-to-t from-slate-300 to-transparent">
        <Barcode
          value={badge.badgeNumber}
          height={32}
          showText={true}
          textColor="#334155"
          indicatorArrow={true}
          altText={`ID: ${badge.badgeNumber} // AUTH: ${badge.expiryDate}`}
        />
      </div>
    </div>
  );
};
