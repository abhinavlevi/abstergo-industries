import React, { useState } from 'react';
import { EmployeeBadge, CardSide } from '../types/badge';
import { VerticalCard } from './VerticalCard';
import { HorizontalCard } from './HorizontalCard';
import { sound } from '../utils/audio';
import { RotateCw, Sparkles, Eye } from 'lucide-react';

interface BadgePreviewProps {
  badge: EmployeeBadge;
  currentSide: CardSide;
  onSideChange: (side: CardSide) => void;
  frontRef: React.RefObject<HTMLDivElement | null>;
  backRef: React.RefObject<HTMLDivElement | null>;
}

export const BadgePreview: React.FC<BadgePreviewProps> = ({
  badge,
  currentSide,
  onSideChange,
  frontRef,
  backRef,
}) => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = badge.layout === 'vertical';
  const width = isVertical ? 320 : 500;
  const height = isVertical ? 490 : 315;

  const handleFlip = () => {
    sound.playFlip();
    onSideChange(currentSide === 'front' ? 'back' : 'front');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Mild 3D tilt
    const tiltX = ((y - centerY) / centerY) * -7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Top Card Controls */}
      <div className="flex items-center justify-between w-full max-w-[500px] mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isVertical ? 'Vertical Staff Pass (320×490)' : 'Horizontal Keycard (500×315)'}
          </span>
        </div>

        {/* 3D Flip Button */}
        <button
          type="button"
          onClick={handleFlip}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 shadow-sm transition-all duration-150 active:scale-95"
          title="Flip card between Front and Back"
        >
          <RotateCw className="w-3.5 h-3.5 text-sky-400" />
          <span>Flip to {currentSide === 'front' ? 'Back' : 'Front'}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-sky-300">
            {currentSide.toUpperCase()}
          </span>
        </button>
      </div>

      {/* Outer Preview Stage with studio backdrops & responsive scaling */}
      <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden w-full max-w-[560px]">
        {/* Subtle grid in preview stage */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Perspective Stage */}
        <div
          className="perspective-1000 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleFlip}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {/* Card 3D Rotating Container */}
          <div
            className="w-full h-full relative transition-transform duration-500 preserve-3d"
            style={{
              transform: `rotateY(${currentSide === 'back' ? 180 : 0}deg) rotateX(${
                isHovered ? tilt.x : 0
              }deg) rotateY(${
                (currentSide === 'back' ? 180 : 0) + (isHovered ? tilt.y : 0)
              }deg)`,
            }}
          >
            {/* FRONT FACE */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden"
              style={{ zIndex: currentSide === 'front' ? 2 : 1 }}
            >
              <div ref={frontRef}>
                {isVertical ? (
                  <VerticalCard badge={badge} side="front" />
                ) : (
                  <HorizontalCard badge={badge} side="front" />
                )}
              </div>
            </div>

            {/* BACK FACE */}
            <div
              className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
              style={{ zIndex: currentSide === 'back' ? 2 : 1 }}
            >
              <div ref={backRef}>
                {isVertical ? (
                  <VerticalCard badge={badge} side="back" />
                ) : (
                  <HorizontalCard badge={badge} side="back" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Studio Lighting Specular Glare Effect on Hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-300"
            style={{
              transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
            }}
          />
        )}
      </div>

      {/* Hint pill below card */}
      <div className="flex items-center gap-3 mt-3 text-xs text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          Click card to flip
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
          Move mouse to inspect holographic shimmer
        </span>
      </div>
    </div>
  );
};
