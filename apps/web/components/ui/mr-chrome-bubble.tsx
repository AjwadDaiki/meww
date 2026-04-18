'use client';

type MrChromeBubbleProps = {
  size?: number;
  className?: string;
  duration?: number;
};

export function MrChromeBubble({
  size = 40,
  className,
  duration = 3,
}: MrChromeBubbleProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(200,211,232,0.6) 30%, rgba(181,101,232,0.3) 60%, rgba(62,196,230,0.4) 100%)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: 'inset 0 -4px 8px rgba(181,101,232,0.2), 0 2px 8px rgba(0,0,0,0.1)',
        animation: `bubble-float ${duration}s ease-in-out infinite`,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
