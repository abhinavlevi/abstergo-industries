import React from 'react';
import { EmployeeBadge } from '../types/badge';
import { SmartChip } from './SmartChip';
import { Barcode } from './Barcode';
import { BrandMark } from './BrandMark';
import { HolographicSeal } from './HolographicSeal';
import { QRCodeSVG } from 'qrcode.react';
import { Wifi, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HorizontalCardProps {
  badge: EmployeeBadge;
  side: 'front' | 'back';
}

export const HorizontalCard: React.FC<HorizontalCardProps> = ({ badge, side }) => {
  const { zoom, panX, panY } = badge.photoTransform;

  if (side === 'back') {
    return (
      <div
        className="w-[500px] h-[315px] bg-[#F8FAFC] text-slate-800 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xl border border-slate-300 select-none"
        style={{ width: '500px', height: '315px' }}
      >
        {/* Technical grid overlay */}
        <div className="absolute inset-0 technical-grid pointer-events-none" />

        {/* Top Magnetic Stripe */}
        <div>
          <div className="h-10 w-full magnetic-stripe relative flex items-center px-6">
            <div className="h-[2px] w-full bg-slate-800 opacity-40" />
          </div>
        </div>

        {/* Content body */}
        <div className="px-6 grid grid-cols-12 gap-4 items-center">
          {/* Left: Signature Strip & Legal */}
          <div className="col-span-8 space-y-2">
            <div>
              <div className="text-[7.5px] uppercase font-mono tracking-wider text-slate-500 mb-0.5">
                Authorized Signature // Void If Altered
              </div>
              <div className="h-7 bg-white border border-slate-300 rounded flex items-center px-3 font-serif italic text-slate-800 text-sm">
                {badge.fullName}
              </div>
            </div>

            <div className="text-[7px] leading-tight text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800 uppercase tracking-wide">
                PROPERTY OF ABSTERGO INDUSTRIES • NOT TRANSFERABLE
              </p>
              <p>
                Possession of this credential signifies authorized access to specified facilities only. All holders are subject to continuous biometric authentication and perimeter monitoring.
              </p>
              <p className="font-mono text-[6.5px] text-slate-500">
                Return to: Dept of Corporate Security, 1200 Market St, Philadelphia, PA 19107 USA.
              </p>
            </div>
          </div>

          {/* Right: Hologram & QR Code */}
          <div className="col-span-4 flex flex-col items-center justify-center gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <HolographicSeal serialNumber={badge.badgeNumber} size="sm" />
              <div className="p-1 bg-white rounded border border-slate-200">
                <QRCodeSVG
                  value={`https://abstergo.com/verify?id=${badge.badgeNumber}&dept=${encodeURIComponent(badge.department)}`}
                  size={42}
                  level="M"
                />
              </div>
            </div>
            <span className="font-mono text-[7px] text-slate-500 tracking-wider">
              ISO/IEC 14443 • MIFARE
            </span>
          </div>
        </div>

        {/* Footer brandmark and tech compliance */}
        <div className="px-6 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-[8px] font-mono text-slate-500">
          <BrandMark variant="dark" size="sm" />
          <div className="flex items-center gap-3">
            <span>ISSUED: {badge.issueDate}</span>
            <span>EXPIRES: {badge.expiryDate}</span>
            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED
            </span>
          </div>
        </div>
      </div>
    );
  }

  // FRONT of Horizontal Card (500 × 315 px)
  return (
    <div
      className="w-[500px] h-[315px] bg-[#F8FAFC] text-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xl border border-slate-300 select-none"
      style={{ width: '500px', height: '315px' }}
    >
      {/* Subtle background technical grid */}
      <div className="absolute inset-0 technical-grid pointer-events-none" />

      {/* Large subtle Abstergo watermark in background - strict <= 5% opacity */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.045] pointer-events-none">
        <svg width="250" height="250" viewBox="0 0 100 100" fill="none">
          <polygon points="50,6 14,76 34,76 60,25" fill="#091E3A" />
          <polygon points="14,76 86,76 76,58 30,58" fill="#091E3A" />
          <polygon points="86,76 50,6 40,23 68,76" fill="#091E3A" />
        </svg>
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 pt-4 px-6 flex items-center justify-between border-b border-slate-200 pb-2">
        <BrandMark variant="dark" size="md" />

        <div className="flex items-center gap-4">
          {/* Smart Chip */}
          <SmartChip size="sm" />

          {/* RFID Wave Indicator */}
          <div className="flex items-center gap-1.5 text-abstergo-navy bg-slate-100 px-2 py-1 rounded border border-slate-200">
            <Wifi className="w-4 h-4 rotate-90" />
            <span className="text-[9px] font-mono font-bold tracking-wider">PROX</span>
          </div>
        </div>
      </div>

      {/* Main Body: Portrait on left, details on right */}
      <div className="relative z-10 px-6 py-2 grid grid-cols-12 gap-5 items-center">
        {/* Left Column: Portrait & Badge ID */}
        <div className="col-span-4 flex flex-col items-center">
          <div className="w-[110px] h-[135px] bg-slate-200 border-2 border-slate-300 rounded-md overflow-hidden relative shadow-md">
            <img
              src={badge.photoUrl}
              alt={badge.fullName}
              className="w-full h-full object-cover origin-center transition-transform duration-75"
              style={{
                transform: `scale(${zoom}) translate(${panX}%, ${panY}%)`,
              }}
              crossOrigin="anonymous"
            />
            {/* Tech reticle accents */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white/70 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white/70 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white/70 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white/70 pointer-events-none" />
          </div>

          <span className="font-mono text-[9px] font-bold text-slate-700 tracking-wider mt-1">
            {badge.badgeNumber}
          </span>
        </div>

        {/* Right Column: Name, Title, Clearance, Hologram */}
        <div className="col-span-8 flex flex-col justify-between h-full space-y-2">
          {/* Name & Title */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[7.5px] font-mono uppercase tracking-widest text-slate-500">
                AUTHORIZED PERSONNEL // FACILITY ACCESS
              </span>
              <span className="text-[8px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ACTIVE
              </span>
            </div>
            <h1
              className="text-xl font-extrabold tracking-tight text-abstergo-navy uppercase mt-0.5 leading-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {badge.fullName}
            </h1>
            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {badge.roleTitle}
            </p>
            <p className="text-[9.5px] font-mono text-slate-500">
              {badge.department}
            </p>
          </div>

          {/* Clearance & Holographic seal row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-mono text-slate-500 uppercase">SECURITY CLEARANCE</span>
              <span className="inline-block px-2.5 py-1 bg-[#C8381A] text-white rounded text-[10px] font-bold tracking-wider font-mono shadow-sm">
                {badge.clearanceLevel.toUpperCase()}
              </span>
            </div>

            <HolographicSeal serialNumber={badge.badgeNumber} size="sm" />
          </div>

          {/* Metadata pill row */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded border border-slate-200 text-[8px] font-mono text-slate-600">
            <div>
              <span className="text-slate-400 block text-[6.5px]">BLOOD TYPE</span>
              <span className="font-bold text-slate-800">{badge.bloodType}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[6.5px]">DNA LOCUS</span>
              <span className="font-bold text-slate-800 truncate block">{badge.dnaMarker}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[6.5px]">SECURITY CODE</span>
              <span className="font-bold text-slate-800 truncate block">{badge.securityString}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Barcode Strip */}
      <div className="relative z-10 px-6 py-2 bg-slate-200/60 border-t border-slate-200">
        <Barcode
          value={badge.badgeNumber}
          height={24}
          showText={true}
          textColor="#475569"
          altText={`AUTHENTICATED ACCESS // ${badge.securityString || badge.badgeNumber} // VALID THRU ${badge.expiryDate}`}
        />
      </div>
    </div>
  );
};
