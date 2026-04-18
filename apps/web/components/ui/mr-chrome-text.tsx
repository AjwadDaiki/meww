import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MrChromeTextProps = {
  children: ReactNode;
  className?: string;
};

export function MrChromeText({ children, className }: MrChromeTextProps) {
  return (
    <span
      className={cn(
        'chrome-text font-[family-name:var(--font-orbitron)] font-bold',
        className
      )}
    >
      {children}
    </span>
  );
}
