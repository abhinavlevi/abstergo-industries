import React, { useRef, useState } from 'react';
import { EmployeeBadge, CardLayout, ClearanceLevel } from '../types/badge';
import { PRESETS } from '../data/presets';
import { sound } from '../utils/audio';
import { encodeBadgeToUrl } from '../utils/urlState';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  Upload,
  RotateCcw,
  Download,
  Share2,
  Printer,
  ShieldCheck,
  Sliders,
  Check,
  CreditCard,
  Users
} from 'lucide-react';

interface BadgeControlsProps {
  badge: EmployeeBadge;
  onChange: (badge: EmployeeBadge) => void;
  frontRef: React.RefObject<HTMLDivElement | null>;
  backRef: React.RefObject<HTMLDivElement | null>;
}

export const BadgeControls: React.FC<BadgeControlsProps> = ({
  badge,
  onChange,
  frontRef,
  backRef,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'info' | 'photo' | 'export'>('presets');

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    sound.playChirp();
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    onChange({
      ...badge,
      fullName: preset.name,
      roleTitle: preset.role,
      department: preset.department,
      clearanceLevel: preset.clearance,
      badgeNumber: preset.badgeNumber,
      securityString: preset.securityString,
      bloodType: preset.bloodType,
      dnaMarker: preset.dnaMarker,
      photoUrl: preset.photoUrl,
      photoTransform: {
        zoom: preset.defaultZoom || 1.0,
        panX: 0,
        panY: 0,
      },
    });
  };

  // Handle Local Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sound.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange({
          ...badge,
          photoUrl: dataUrl,
          photoTransform: { zoom: 1.0, panX: 0, panY: 0 },
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // Sliders
  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = parseFloat(e.target.value);
    onChange({
      ...badge,
      photoTransform: { ...badge.photoTransform, zoom },
    });
  };

  const handlePanXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const panX = parseFloat(e.target.value);
    onChange({
      ...badge,
      photoTransform: { ...badge.photoTransform, panX },
    });
  };

  const handlePanYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const panY = parseFloat(e.target.value);
    onChange({
      ...badge,
      photoTransform: { ...badge.photoTransform, panY },
    });
  };

  const handleResetPhoto = () => {
    sound.playClick();
    onChange({
      ...badge,
      photoTransform: { zoom: 1.0, panX: 0, panY: 0 },
    });
  };

  // Layout Toggle
  const handleLayoutToggle = (layout: CardLayout) => {
    sound.playClick();
    onChange({ ...badge, layout });
  };

  // Export to 3× PNG
  const handleExportSide = async (side: 'front' | 'back') => {
    const targetRef = side === 'front' ? frontRef : backRef;
    if (!targetRef.current) return;

    try {
      setIsExporting(true);
      sound.playClick();

      const isVertical = badge.layout === 'vertical';
      const width = isVertical ? 320 : 500;
      const height = isVertical ? 490 : 315;

      const dataUrl = await toPng(targetRef.current, {
        pixelRatio: 3,
        width,
        height,
        cacheBust: true,
        style: {
          transform: 'none',
        },
      });

      const filename = `Abstergo_${badge.fullName.replace(/\s+/g, '_')}_${badge.layout}_${side}_3x.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      sound.playSuccess();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0B2545', '#C8381A', '#38BDF8', '#10B981'],
      });
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportBoth = async () => {
    await handleExportSide('front');
    setTimeout(() => {
      handleExportSide('back');
    }, 400);
  };

  // Direct Print
  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  // Share URL
  const handleShare = () => {
    sound.playScan();
    const url = encodeBadgeToUrl(badge);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const clearanceOptions: ClearanceLevel[] = [
    'Sector Alpha',
    'Sector Beta',
    'Sector Gamma',
    'Sector Master',
    'Level 10 (Executive)',
    'Level 9 (Senior)',
    'Level 7 (Specialist)',
    'Inner Sanctum',
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 pb-3 gap-2 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('presets');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'presets'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Profiles</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('info');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'info'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Card Details</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('photo');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'photo'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Photo Framing</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('export');
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
            activeTab === 'export'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Export &amp; Print</span>
        </button>
      </div>

      {/* TAB 1: CURATED PROFILES */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Choose an Employee Profile
            </h3>
            <span className="text-xs text-slate-500">3 Verified Presets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESETS.map((preset) => {
              const isSelected = badge.fullName === preset.name;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                      : 'border-slate-200 bg-slate-50/80 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={preset.photoUrl}
                      alt={preset.name}
                      className="w-12 h-14 object-cover rounded border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{preset.name}</h4>
                      <p className="text-[11px] text-blue-700 truncate font-medium">{preset.role}</p>
                      <span className="inline-block mt-1 text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                        {preset.clearance}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                    {preset.description}
                  </p>

                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 text-blue-600">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Card Layout Selector */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Card Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLayoutToggle('vertical')}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  badge.layout === 'vertical'
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Vertical ID Badge</div>
                  <div className="text-[11px] text-slate-500">320 × 490 px • Lanyard Slot</div>
                </div>
                {badge.layout === 'vertical' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                type="button"
                onClick={() => handleLayoutToggle('horizontal')}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  badge.layout === 'horizontal'
                    ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-600'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Horizontal Access Keycard</div>
                  <div className="text-[11px] text-slate-500">500 × 315 px • RFID Contactless</div>
                </div>
                {badge.layout === 'horizontal' && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EDIT CARD DETAILS */}
      {activeTab === 'info' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={badge.fullName}
                onChange={(e) => onChange({ ...badge, fullName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Lucy Stillman"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={badge.roleTitle}
                onChange={(e) => onChange({ ...badge, roleTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Senior Geneticist"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={badge.department}
                onChange={(e) => onChange({ ...badge, department: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. Research Laboratory"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security Clearance Level
              </label>
              <select
                value={badge.clearanceLevel}
                onChange={(e) =>
                  onChange({ ...badge, clearanceLevel: e.target.value as ClearanceLevel })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
              >
                {clearanceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Badge Serial Number
              </label>
              <input
                type="text"
                value={badge.badgeNumber}
                onChange={(e) => onChange({ ...badge, badgeNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. AS-0006-0986"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Barcode String
              </label>
              <input
                type="text"
                value={badge.securityString}
                onChange={(e) => onChange({ ...badge, securityString: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. animus 0006-0986"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                value={badge.issueDate}
                onChange={(e) => onChange({ ...badge, issueDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={badge.expiryDate}
                onChange={(e) => onChange({ ...badge, expiryDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Blood Type
              </label>
              <input
                type="text"
                value={badge.bloodType}
                onChange={(e) => onChange({ ...badge, bloodType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. A+"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security ID Code
              </label>
              <input
                type="text"
                value={badge.dnaMarker}
                onChange={(e) => onChange({ ...badge, dnaMarker: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. ISO-88A-SEC"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PHOTO FRAMING & UPLOAD */}
      {activeTab === 'photo' && (
        <div className="space-y-4">
          {/* Privacy Guarantee Notice */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <p className="font-bold text-emerald-800">
                Privacy: Your photo stays in this browser and is never uploaded.
              </p>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                All photos are handled entirely on your computer using standard HTML5 FileReader. No image files or data leave your browser.
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-300 flex items-center justify-center gap-2 text-xs font-semibold transition-all shadow-xs"
            >
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Upload Custom Photo (PNG, JPG, or WebP)</span>
            </button>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Zoom Scale</span>
                <span className="font-mono text-slate-500">{badge.photoTransform.zoom.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.05"
                value={badge.photoTransform.zoom}
                onChange={handleZoomChange}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Horizontal Pan</span>
                <span className="font-mono text-slate-500">{badge.photoTransform.panX}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={badge.photoTransform.panX}
                onChange={handlePanXChange}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Vertical Pan</span>
                <span className="font-mono text-slate-500">{badge.photoTransform.panY}%</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                step="1"
                value={badge.photoTransform.panY}
                onChange={handlePanYChange}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={handleResetPhoto}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Photo Position</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: EXPORT & PRINT */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
            <p className="font-bold text-blue-900 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-blue-600" />
              High-Resolution 3× PNG Export
            </p>
            <p className="text-[11px] text-blue-700">
              Renders sharp 300 DPI print-ready images ({badge.layout === 'vertical' ? '960 × 1470 px' : '1500 × 945 px'}) using exact physical card dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleExportSide('front')}
              className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Front Side (3×)</span>
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={() => handleExportSide('back')}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Back Side (3×)</span>
            </button>

            <button
              type="button"
              disabled={isExporting}
              onClick={handleExportBoth}
              className="py-2.5 px-3 bg-[#C8381A] hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Both Sides</span>
            </button>
          </div>

          <div className="flex gap-2.5 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-300 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4 text-emerald-600" />
              <span>Print Badge (1:1)</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-300 transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span>Share via Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
