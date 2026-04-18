'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'chrome' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type MrButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  pulse?: boolean;
  className?: string;
  type?: 'button' | 'submit';
};

const VARIANT_STYLES = {
  primary: 'bg-mr-yellow-pop text-mr-black-soft hover:shadow-[0_8px_30px_rgba(255,237,74,0.4)]',
  secondary: 'bg-mr-pink-hot text-mr-white-pure hover:shadow-[0_8px_30px_rgba(255,62,165,0.4)]',
  chrome: 'chrome-text bg-mr-black-soft border-2 border-mr-yellow-gold/30',
  ghost: 'bg-transparent border-2 border-mr-white-pure/30 text-mr-white-pure hover:border-mr-white-pure/60',
} as const;

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
  xl: 'px-10 py-5 text-xl rounded-full',
} as const;

export function MrButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  pulse = false,
  className,
  type = 'button',
}: MrButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'font-[family-name:var(--font-anton)] uppercase tracking-wide',
        'transition-all duration-200 ease-[var(--ease-bounce)]',
        'hover:scale-[1.03] active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        'cursor-pointer',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        pulse && !disabled && 'animate-cta-pulse',
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
