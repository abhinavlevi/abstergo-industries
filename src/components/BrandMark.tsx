import React from 'react';

interface BrandMarkProps {
  variant?: 'light' | 'dark'; // 'light' means light text for dark backgrounds; 'dark' means dark text for light backgrounds
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
}) => {
  const isLight = variant === 'light';
  
  // Dimensions
  const iconSizes = {
    sm: { w: 22, h: 22 },
    md: { w: 34, h: 34 },
    lg: { w: 46, h: 46 },
  };

  const { w, h } = iconSizes[size];

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Precision Vector Abstergo Penrose Triangle */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Top-left chevron */}
        <polygon
          points="50,6 14,76 34,76 60,25"
          fill={isLight ? '#FFFFFF' : '#091E3A'}
        />
        {/* Bottom chevron */}
        <polygon
          points="14,76 86,76 76,58 30,58"
          fill={isLight ? '#CBD5E1' : '#1E293B'}
        />
        {/* Right chevron */}
        <polygon
          points="86,76 50,6 40,23 68,76"
          fill={isLight ? '#94A3B8' : '#0B2545'}
        />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-bold tracking-tight text-left ${
              size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'
            } ${isLight ? 'text-white' : 'text-abstergo-navy'}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Abstergo
          </span>
          <span
            className={`tracking-wider uppercase text-left font-medium ${
              size === 'sm'
                ? 'text-[7px]'
                : size === 'lg'
                ? 'text-[11px]'
                : 'text-[9px]'
            } ${isLight ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Industries
          </span>
        </div>
      )}
    </div>
  );
};
