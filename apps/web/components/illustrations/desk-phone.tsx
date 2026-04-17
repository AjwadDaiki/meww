import { cn } from '@/lib/utils';

type DeskPhoneProps = {
  className?: string;
  width?: number;
  height?: number;
};

export function DeskPhone({ className, width = 112, height = 148 }: DeskPhoneProps) {
  return (
    <svg
      viewBox="0 0 112 148"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('flex-shrink-0', className)}
    >
      {/* Shadow */}
      <path
        d="M12 10 L104 8 L106 142 L10 144 Z"
        fill="var(--mr-ink)"
        opacity="0.1"
      />
      {/* Phone body */}
      <path
        d="M8 6 L100 4 L102 138 L6 140 Z"
        fill="var(--mr-ink)"
        stroke="var(--mr-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Cel-shading lighter panel */}
      <path
        d="M14 12 L94 10 L96 132 L12 134 Z"
        fill="var(--mr-ink)"
        opacity="0.9"
      />
      {/* Handset cradle */}
      <path
        d="M24 20 C30 16, 42 14, 56 15 C70 16, 80 14, 86 20
           L86 32 C80 28, 70 26, 56 27 C42 28, 30 26, 24 32 Z"
        fill="var(--mr-ink-blue)"
        opacity="0.15"
        stroke="var(--mr-paper)"
        strokeWidth="1"
        opacity="0.2"
      />
      {/* Dial circle */}
      <circle
        cx="55" cy="80"
        r="30"
        fill="none"
        stroke="var(--mr-paper)"
        strokeWidth="2"
        opacity="0.15"
      />
      {/* Dial center */}
      <circle
        cx="55" cy="80"
        r="6"
        fill="var(--mr-paper)"
        opacity="0.08"
      />
      {/* Finger holes */}
      {[...Array(10)].map((_, i) => {
        const angle = (i * 30 - 60) * (Math.PI / 180);
        const cx = 55 + 20 * Math.cos(angle);
        const cy = 80 + 20 * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="none"
            stroke="var(--mr-paper)"
            strokeWidth="1.2"
            opacity="0.1"
          />
        );
      })}
      {/* Base groove */}
      <line
        x1="22" y1="124"
        x2="88" y2="123"
        stroke="var(--mr-paper)"
        strokeWidth="1.5"
        opacity="0.1"
      />
    </svg>
  );
}
