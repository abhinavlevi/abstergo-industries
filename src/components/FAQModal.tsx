import React from 'react';
import { X, Printer, Eye, Lock, ShieldCheck } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 text-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              User Guide &amp; Frequently Asked Questions
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-600">
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-900 text-sm">
                100% Client-Side Privacy Guarantee
              </h3>
              <p className="mt-1 text-emerald-800">
                All photos you upload and details you enter remain strictly inside your browser. No files, personal names, or badge data are ever uploaded, saved to a server, or shared.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
            <Printer className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 text-sm">
                Print-Ready 3× Resolution (300 DPI)
              </h3>
              <p className="mt-1 text-blue-800">
                Downloaded badges are exported at 3 times physical pixel dimensions:
              </p>
              <ul className="list-disc list-inside mt-1.5 text-blue-800 space-y-1">
                <li><strong>Vertical Staff Badge:</strong> 320 × 490 px standard → exports at 960 × 1470 px.</li>
                <li><strong>Horizontal Keycard:</strong> 500 × 315 px standard → exports at 1500 × 945 px.</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <Eye className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Dual-Sided 3D Card Preview
              </h3>
              <p className="mt-1 text-slate-600">
                Click the Flip button or click directly on the badge to see both the front and back. The back includes a dark magnetic stripe, signature box, legal return notice, and scannable QR verification code.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Card Formats &amp; Presets
              </h3>
              <p className="mt-1 text-slate-600">
                Choose between the Vertical Staff Credential with a lanyard slot cutout, or the Horizontal Facility Access Keycard. You can switch between curated profiles (Lucy Stillman, Dr. Warren Vidic, Alan Rikkin) or customize every field with your own photo and title.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
