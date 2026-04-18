import { cn } from '@/lib/utils';

type DeskStampProps = {
  variant?: 'red' | 'green' | 'blue';
  className?: string;
  width?: number;
  height?: number;
};

const VARIANT_COLORS = {
  red: 'var(--mr-stamp-red)',
  green: 'var(--mr-stamp-green)',
  blue: 'var(--mr-ink-blue)',
} as const;

export function DeskStamp({ variant = 'red', className, width = 160, height = 56 }: DeskStampProps) {
  const color = VARIANT_COLORS[variant];

  return (
    <svg
      viewBox="0 0 160 56"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Stamp outline — slightly wavy edges for ink impression */}
      <path
        d="M6 4 C20 3, 40 5, 60 3.5 C80 2, 100 4.5, 120 3 C140 1.5, 152 4, 155 5
           L156 48 C152 49, 140 51.5, 120 50 C100 48.5, 80 51, 60 49.5
           C40 48, 20 50.5, 6 49 Z"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.85"
      />
      {/* Inner border — double-line stamp effect */}
      <path
        d="M12 9 C28 8, 44 10, 60 8.5 C76 7, 96 9.5, 116 8 C136 6.5, 146 9, 149 10
           L150 43 C146 44, 136 46, 116 45 C96 43.5, 76 46, 60 44.5
           C44 43, 28 45, 12 44 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* Ink splatter dots for texture */}
      <circle cx="25" cy="20" r="1" fill={color} opacity="0.3" />
      <circle cx="135" cy="38" r="0.8" fill={color} opacity="0.25" />
      <circle cx="80" cy="10" r="0.6" fill={color} opacity="0.2" />
    </svg>
  );
}
