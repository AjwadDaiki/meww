import { cn } from '@/lib/utils';

type DeskPostitProps = {
  color?: 'yellow' | 'pink';
  className?: string;
  width?: number;
  height?: number;
};

const FILL_MAP = {
  yellow: 'var(--mr-postit)',
  pink: 'var(--mr-postit-pink)',
} as const;

export function DeskPostit({ color = 'yellow', className, width = 144, height = 136 }: DeskPostitProps) {
  const fill = FILL_MAP[color];
  // Shadow: same fill at lower opacity, not a separate hex
  const shadowFill = fill;

  return (
    <svg
      viewBox="0 0 144 136"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Drop shadow */}
      <path
        d="M6 10 L140 8 L141 130 L110 131 L108 126 L5 128 Z"
        fill="var(--mr-ink)"
        opacity="0.08"
      />
      {/* Post-it body — slightly wonky edges */}
      <path
        d="M4 6 L138 4 L140 118 L108 120 L106 128 L3 126 Z"
        fill={fill}
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Folded corner */}
      <path
        d="M108 120 L106 128 L140 118 Z"
        fill={shadowFill}
        stroke="var(--mr-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cel-shading shadow band at bottom */}
      <path
        d="M4 100 L3 126 L106 128 L108 120 L140 118 L140 98 Z"
        fill={shadowFill}
        opacity="0.25"
      />
      {/* Subtle crease lines */}
      <line
        x1="20" y1="40" x2="120" y2="39"
        stroke="var(--mr-ink)" strokeWidth="0.5" opacity="0.06"
      />
      <line
        x1="20" y1="60" x2="120" y2="59"
        stroke="var(--mr-ink)" strokeWidth="0.5" opacity="0.06"
      />
      <line
        x1="20" y1="80" x2="120" y2="79.5"
        stroke="var(--mr-ink)" strokeWidth="0.5" opacity="0.06"
      />
    </svg>
  );
}
