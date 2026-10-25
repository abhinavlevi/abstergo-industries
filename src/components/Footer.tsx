import React from 'react';
import { BrandMark } from './BrandMark';
import { ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenFAQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFAQ }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-slate-600 py-8 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BrandMark variant="dark" size="sm" showText={true} />
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-medium">Corporate Security &amp; Access Control</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="text-slate-500">
            Headquarters: 1200 Market Street, Philadelphia, PA 19107
          </span>
          <button
            type="button"
            onClick={onOpenFAQ}
            className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4"
          >
            Guide &amp; FAQs
          </button>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Fictional Prop Replica Tool • Inspired by Assassin&apos;s Creed Universe</span>
        </div>
      </div>
    </footer>
  );
};
