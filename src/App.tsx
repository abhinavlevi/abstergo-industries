import { useState, useRef, useEffect } from 'react';
import { EmployeeBadge, CardSide } from './types/badge';
import { DEFAULT_BADGE } from './data/presets';
import { decodeBadgeFromUrl } from './utils/urlState';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BadgePreview } from './components/BadgePreview';
import { BadgeControls } from './components/BadgeControls';
import { FAQModal } from './components/FAQModal';
import { Analytics } from '@vercel/analytics/react';

export function App() {
  const [badge, setBadge] = useState<EmployeeBadge>(() => {
    return decodeBadgeFromUrl(DEFAULT_BADGE);
  });

  const [currentSide, setCurrentSide] = useState<CardSide>('front');
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // References for html-to-image capture (strictly unscaled elements)
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Sync state if user navigates with back/forward history hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setBadge((prev) => decodeBadgeFromUrl(prev));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Vercel Analytics */}
      <Analytics />

      {/* Corporate Header */}
      <Header onOpenFAQ={() => setIsFAQOpen(true)} />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 3D Card Preview Stage */}
          <div className="lg:col-span-6 flex flex-col items-center sticky top-20 z-10">
            <BadgePreview
              badge={badge}
              currentSide={currentSide}
              onSideChange={setCurrentSide}
              frontRef={frontRef}
              backRef={backRef}
            />
          </div>

          {/* Right Column: Customization Controls & Presets */}
          <div className="lg:col-span-6">
            <BadgeControls
              badge={badge}
              onChange={setBadge}
              frontRef={frontRef}
              backRef={backRef}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenFAQ={() => setIsFAQOpen(true)} />

      {/* User Guide & FAQ Modal */}
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </div>
  );
}

export default App;
