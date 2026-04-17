import { cn } from '@/lib/utils';

type DeskPolaroidProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function DeskPolaroid({ className, width = 156, height = 200 }: DeskPolaroidProps) {
  return (
    <svg
      viewBox="0 0 156 200"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Polaroid body — slightly imperfect rectangle */}
      <path
        d="M8 3 L149 4.5 L150 196 L6 197.5 Z"
        fill="var(--mr-paper)"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Shadow tone on right edge */}
      <path
        d="M149 4.5 L150 196 L142 194 L141 10 Z"
        fill="var(--mr-paper-shadow)"
        opacity="0.3"
      />
      {/* Photo area */}
      <rect
        x="16" y="12"
        width="124" height="140"
        rx="1"
        fill="var(--mr-paper-aged)"
        stroke="var(--mr-ink)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {/* Pin at top */}
      <circle
        cx="78" cy="6"
        r="4"
        fill="var(--mr-ink-red)"
        stroke="var(--mr-ink)"
        strokeWidth="1.5"
      />
      {/* Pin highlight */}
      <circle
        cx="76.5" cy="4.5"
        r="1.2"
        fill="var(--mr-paper)"
        opacity="0.5"
      />
      {/* Caption line placeholder */}
      <line
        x1="30" y1="170"
        x2="126" y2="171"
        stroke="var(--mr-ink)"
        strokeWidth="1"
        opacity="0.15"
      />
    </svg>
  );
}
