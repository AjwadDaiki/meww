'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MrChromeText } from './mr-chrome-text';

type ScreenVariant = 'yellow' | 'pink' | 'blue';

type MrScreenProps = {
  children: ReactNode;
  variant?: ScreenVariant;
  showBrand?: boolean;
  className?: string;
};

export function MrScreen({
  children,
  variant = 'yellow',
  showBrand = true,
  className,
}: MrScreenProps) {
  const plasticVar = {
    yellow: 'var(--mr-plastic-yellow)',
    pink: 'var(--mr-plastic-pink)',
    blue: 'var(--mr-plastic-blue)',
  }[variant];

  return (
    <div className={cn('relative mx-auto max-w-lg', className)}>
      {/* Brand header */}
      {showBrand && (
        <div className="text-center mb-2">
          <MrChromeText className="text-lg">MEOWREEL</MrChromeText>
        </div>
      )}

      {/* LCD screen — clean version, no plastic coque (per Ajwad: skip if cheap) */}
      <div className="lcd-screen p-4 md:p-6">
        {children}
      </div>

      {/* Decorative buttons below screen */}
      <div className="flex justify-center gap-4 mt-3">
        <div
          className="w-6 h-6 rounded-full border-2 border-mr-black-soft/20"
          style={{ backgroundColor: plasticVar }}
          aria-hidden="true"
        />
        <div
          className="w-6 h-6 rounded-full border-2 border-mr-black-soft/20"
          style={{ backgroundColor: plasticVar }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
