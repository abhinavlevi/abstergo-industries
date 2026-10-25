import React from 'react';

interface HolographicSealProps {
  serialNumber?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const HolographicSeal: React.FC<HolographicSealProps> = ({
  serialNumber = 'ABST-SEC-7109',
  size = 'md',
  className = '',
}) => {
  const isSm = size === 'sm';
  const dimension = isSm ? 44 : 54;

  return (
    <div
      className={`relative rounded-full holo-seal border border-slate-300 shadow-sm flex items-center justify-center overflow-hidden select-none ${className}`}
      style={{ width: `${dimension}px`, height: `${dimension}px` }}
      title={`Holographic Authenticity Seal #${serialNumber}`}
    >
      {/* Concentric diffraction rings */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="absolute inset-0 opacity-40 mix-blend-overlay"
      >
        <circle cx="50" cy="50" r="45" stroke="#FFF" strokeWidth="1" strokeDasharray="3,2" fill="none" />
        <circle cx="50" cy="50" r="38" stroke="#FFF" strokeWidth="0.75" fill="none" />
        <circle cx="50" cy="50" r="28" stroke="#FFF" strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
      </svg>

      {/* Foil Emblem in center */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <svg
          width={isSm ? 18 : 22}
          height={isSm ? 18 : 22}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,10 16,74 34,74 58,28" fill="#1E293B" opacity="0.85" />
          <polygon points="16,74 84,74 74,58 32,58" fill="#0F172A" opacity="0.95" />
          <polygon points="84,74 50,10 40,26 66,74" fill="#334155" opacity="0.85" />
        </svg>
        <span
          className="text-[6px] tracking-widest font-mono font-bold text-slate-800 opacity-90 mt-[1px]"
          style={{ letterSpacing: '0.08em' }}
        >
          GENUINE
        </span>
      </div>

      {/* Rotating / dynamic specular flare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-30 pointer-events-none" />
    </div>
  );
};
