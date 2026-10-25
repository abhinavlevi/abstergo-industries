import React, { useMemo } from 'react';

interface BarcodeProps {
  value: string;
  height?: number;
  showText?: boolean;
  className?: string;
  textColor?: string;
  color?: string;
  altText?: string;
  indicatorArrow?: boolean;
}

export const Barcode: React.FC<BarcodeProps> = ({
  value,
  height = 36,
  showText = true,
  className = '',
  textColor = '#0F172A',
  color = '#0F172A',
  altText,
  indicatorArrow = false,
}) => {
  // Deterministic Code-128-like bar sequence based on string
  const bars = useMemo(() => {
    const cleanStr = value || 'ABSTERGO-ID';
    const sequence: number[] = [];

    // Start pattern (Code B)
    sequence.push(2, 1, 1, 2, 1, 4);

    // Encode characters into variable bar/space widths
    for (let i = 0; i < cleanStr.length; i++) {
      const charCode = cleanStr.charCodeAt(i);
      // Generate 6 alternating bar/space widths (1 to 4 units each)
      const w1 = ((charCode * 3 + 1) % 4) + 1;
      const w2 = ((charCode * 5 + 2) % 3) + 1;
      const w3 = ((charCode * 7 + 3) % 4) + 1;
      const w4 = ((charCode * 11 + 1) % 3) + 1;
      const w5 = ((charCode * 13 + 2) % 4) + 1;
      const w6 = Math.max(1, 11 - (w1 + w2 + w3 + w4 + w5));
      sequence.push(w1, w2, w3, w4, w5, w6);
    }

    // Stop pattern (2, 3, 3, 1, 1, 1, 2)
    sequence.push(2, 3, 3, 1, 1, 1, 2);

    return sequence;
  }, [value]);

  // Compute total width in module units
  const totalUnits = useMemo(() => {
    return bars.reduce((acc, curr) => acc + curr, 0);
  }, [bars]);

  // Generate SVG rects for alternating bars
  const rects = useMemo(() => {
    const elements: { x: number; width: number }[] = [];
    let currentX = 0;

    bars.forEach((width, index) => {
      // Even index is black bar, odd index is space
      if (index % 2 === 0) {
        elements.push({ x: currentX, width });
      }
      currentX += width;
    });

    return elements;
  }, [bars]);

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center w-full gap-1">
        {indicatorArrow && (
          <div className="flex-shrink-0 text-[#C8381A] pr-0.5">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor">
              <polygon points="0,0 8,6 0,12" />
            </svg>
          </div>
        )}
        <svg
          viewBox={`0 0 ${totalUnits} ${height}`}
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: `${height}px` }}
          shapeRendering="crispEdges"
        >
          {rects.map((r, i) => (
            <rect
              key={i}
              x={r.x}
              y={0}
              width={r.width}
              height={height}
              fill={color}
            />
          ))}
        </svg>
      </div>

      {showText && (
        <span
          className="font-mono text-[9px] tracking-widest uppercase mt-0.5"
          style={{ color: textColor }}
        >
          {altText || value}
        </span>
      )}
    </div>
  );
};
