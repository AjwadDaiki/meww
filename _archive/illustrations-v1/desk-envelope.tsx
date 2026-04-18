import { cn } from '@/lib/utils';

type DeskEnvelopeProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function DeskEnvelope({ className, width = 280, height = 320 }: DeskEnvelopeProps) {
  return (
    <svg
      viewBox="0 0 280 320"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Drop shadow */}
      <path
        d="M14 18 L270 16 L272 312 L12 314 Z"
        fill="var(--mr-ink)"
        opacity="0.08"
      />

      {/* Envelope body — kraft paper */}
      <path
        d="M8 12 L264 10 L266 306 L6 308 Z"
        fill="var(--mr-wood-light)"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Cel-shading: bottom half slightly darker */}
      <path
        d="M8 160 L264 158 L266 306 L6 308 Z"
        fill="var(--mr-wood-mid)"
        opacity="0.2"
      />

      {/* Torn top edge */}
      <path
        d="M8 12
           C20 18, 30 8, 45 14
           C60 20, 70 6, 85 16
           C100 24, 110 10, 125 18
           C140 26, 150 8, 165 14
           C180 22, 190 6, 205 16
           C220 24, 230 10, 245 18
           C255 22, 260 12, 264 10
           L264 10 L8 12 Z"
        fill="var(--mr-wood-light)"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Flap fold line */}
      <line
        x1="18" y1="50"
        x2="255" y2="48"
        stroke="var(--mr-ink)"
        strokeWidth="1"
        strokeDasharray="6 4"
        opacity="0.2"
      />

      {/* Corner fold bottom-right */}
      <path
        d="M230 280 L266 306 L230 306 Z"
        fill="var(--mr-wood-mid)"
        opacity="0.3"
        stroke="var(--mr-ink)"
        strokeWidth="1.5"
      />

      {/* Polaroid 1 peeking out */}
      <g transform="rotate(-8, 80, 30)">
        <rect x="50" y="20" width="60" height="72" rx="1"
          fill="var(--mr-paper)" stroke="var(--mr-ink)" strokeWidth="2" />
        <rect x="56" y="26" width="48" height="48" rx="1"
          fill="var(--mr-paper-aged)" stroke="var(--mr-ink)" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Polaroid 2 peeking out */}
      <g transform="rotate(4, 140, 28)">
        <rect x="110" y="16" width="60" height="72" rx="1"
          fill="var(--mr-paper)" stroke="var(--mr-ink)" strokeWidth="2" />
        <rect x="116" y="22" width="48" height="48" rx="1"
          fill="var(--mr-paper-aged)" stroke="var(--mr-ink)" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Polaroid 3 peeking out */}
      <g transform="rotate(-3, 200, 26)">
        <rect x="170" y="14" width="60" height="72" rx="1"
          fill="var(--mr-paper)" stroke="var(--mr-ink)" strokeWidth="2" />
        <rect x="176" y="20" width="48" height="48" rx="1"
          fill="var(--mr-paper-aged)" stroke="var(--mr-ink)" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Stamp: CASTING 2026 */}
      <g transform="rotate(-2, 210, 120)">
        <rect x="160" y="100" width="90" height="32" rx="2"
          fill="none" stroke="var(--mr-stamp-red)" strokeWidth="2.5" opacity="0.75" />
        <rect x="164" y="104" width="82" height="24" rx="1"
          fill="none" stroke="var(--mr-stamp-red)" strokeWidth="1" opacity="0.4" />
      </g>
    </svg>
  );
}
