'use client';
// This is a placeholder component that doesn't do anything
// It will be removed from the UI, but we keep the file to avoid breaking imports

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large' | string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'default'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  ariaLabel?: string;
  variant?: string;
}

export default function ThemeToggle(_props: ThemeToggleProps) {
  // This component is now a no-op
  return null;
}
