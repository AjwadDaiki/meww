'use client';

type MrSparkleProps = {
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
};

export function MrSparkle({
  size = 12,
  color = 'var(--color-mr-jaune-candy)',
  delay = 0,
  duration = 2,
  className,
}: MrSparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={{
        animation: `sparkle ${duration}s steps(4) infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <path d="M12 0 L14 9.5 L24 12 L14 14.5 L12 24 L10 14.5 L0 12 L10 9.5 Z" />
    </svg>
  );
}
