import React from 'react';

interface SmartChipProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const SmartChip: React.FC<SmartChipProps> = ({ className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const width = isSm ? 42 : 52;
  const height = isSm ? 32 : 40;

  return (
    <div
      className={`relative rounded-md p-[2px] gold-chip overflow-hidden select-none ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 52 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        {/* Beveled border */}
        <rect
          x="1"
          y="1"
          width="50"
          height="38"
          rx="3"
          stroke="#8C6516"
          strokeWidth="1"
        />
        {/* Horizontal dividing traces */}
        <line x1="1" y1="14" x2="51" y2="14" stroke="#8C6516" strokeWidth="0.8" />
        <line x1="1" y1="26" x2="51" y2="26" stroke="#8C6516" strokeWidth="0.8" />
        
        {/* Center contact chamber */}
        <path
          d="M 18,14 L 18,26 L 34,26 L 34,14 Z"
          fill="#D69E2E"
          stroke="#8C6516"
          strokeWidth="0.8"
        />
        {/* Vertical trace cuts */}
        <line x1="18" y1="1" x2="18" y2="14" stroke="#8C6516" strokeWidth="0.8" />
        <line x1="34" y1="1" x2="34" y2="14" stroke="#8C6516" strokeWidth="0.8" />
        <line x1="18" y1="26" x2="18" y2="39" stroke="#8C6516" strokeWidth="0.8" />
        <line x1="34" y1="26" x2="34" y2="39" stroke="#8C6516" strokeWidth="0.8" />

        {/* Diagonal lead traces */}
        <path d="M 22,18 L 30,18" stroke="#F6E05E" strokeWidth="0.75" />
        <path d="M 22,22 L 30,22" stroke="#F6E05E" strokeWidth="0.75" />

        {/* Specular sheen overlay */}
        <rect
          x="0"
          y="0"
          width="52"
          height="40"
          fill="url(#goldSheen)"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="goldSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#ECC94B" stopOpacity="0" />
            <stop offset="60%" stopColor="#ECC94B" stopOpacity="0" />
            <stop offset="100%" stopColor="#B7791F" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
