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

  const handleSelectSide = (side: CardSide) => {
    if (side !== currentSide) {
      sound.playFlip();
      onSideChange(side);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Base rotation: 0deg for front, 180deg for back
  const baseRotationY = currentSide === 'back' ? 180 : 0;
  const currentRotationY = baseRotationY + (isHovered ? tilt.y : 0);
  const currentRotationX = isHovered ? tilt.x : 0;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Card Controls */}
      <div className="flex items-center justify-between w-full max-w-[500px] mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">
            {isVertical ? 'Vertical Badge (320 × 490)' : 'Horizontal Keycard (500 × 315)'}
          </span>
        </div>

        {/* Dual Side Segmented Selector & Flip Button */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-200/90 p-0.5 rounded-lg border border-slate-300">
            <button
              type="button"
              onClick={() => handleSelectSide('front')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                currentSide === 'front'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Front
            </button>
            <button
              type="button"
              onClick={() => handleSelectSide('back')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                currentSide === 'back'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Back
            </button>
          </div>

          <button
            type="button"
            onClick={handleFlip}
            className="p-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 shadow-xs transition-all active:scale-95"
            title="Flip to opposite side"
          >
            <RotateCw className="w-4 h-4 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Outer Preview Stage in Light Studio Tone */}
      <div className="relative p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center overflow-hidden w-full max-w-[560px]">
        {/* Clean studio dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

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
              transform: `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`,
              WebkitTransform: `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`,
            }}
          >
            {/* FRONT FACE (rotateY 0deg) */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div ref={frontRef}>
                {isVertical ? (
                  <VerticalCard badge={badge} side="front" />
                ) : (
                  <HorizontalCard badge={badge} side="front" />
                )}
              </div>
            </div>

            {/* BACK FACE (rotateY 180deg) */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
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

        {/* Studio Lighting Sheen Effect */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25 bg-gradient-to-tr from-transparent via-white to-transparent transition-opacity duration-300"
            style={{
              transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`,
            }}
          />
        )}
      </div>

      {/* Helpful Hint */}
      <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          Click card or use Front / Back toggle above to flip
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Move cursor to preview holographic reflection
        </span>
      </div>
    </div>
  );
};
