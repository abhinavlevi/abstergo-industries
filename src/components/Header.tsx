import React, { useState } from 'react';
import { BrandMark } from './BrandMark';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, HelpCircle, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFAQ }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) {
      sound.playClick();
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Brand mark and clear title */}
        <div className="flex items-center gap-4">
          <BrandMark variant="dark" size="md" />

          <div className="hidden sm:block border-l border-slate-200 pl-4">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight">
                Security ID Generator
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 border border-slate-200 text-slate-700">
                Studio Edition
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Create employee badges &amp; facility access cards
            </p>
          </div>
        </div>

        {/* Right: Sound FX, Privacy pill, Guide modal */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Private (No Uploads)</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'border-slate-200 bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-xs'
            }`}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* User Guide */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenFAQ();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all"
          >
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Guide &amp; FAQ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
