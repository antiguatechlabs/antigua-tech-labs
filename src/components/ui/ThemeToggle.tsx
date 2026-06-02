'use client';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

import { useLanguage, useTheme } from '@/context';

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

export default function ThemeToggle({
  size = 'medium',
  color = 'inherit',
  ariaLabel,
  variant = 'outlined',
}: ThemeToggleProps) {
  const { language } = useLanguage();
  const { themeMode, toggleTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';

  const labels = {
    en: isDarkMode ? 'Switch to light mode' : 'Switch to dark mode',
    es: isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
  };
  const label = ariaLabel || labels[language] || labels.en;

  return (
    <Tooltip title={label}>
      <IconButton
        aria-label={label}
        aria-pressed={isDarkMode}
        color={color}
        onClick={toggleTheme}
        size={size === 'large' ? 'large' : size === 'small' ? 'small' : 'medium'}
        sx={{
          border: variant === 'outlined' ? '1px solid' : 'none',
          borderColor: 'divider',
          borderRadius: 1,
          width: size === 'small' ? 36 : 40,
          height: size === 'small' ? 36 : 40,
          color: 'text.primary',
          transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'primary.main',
          },
        }}
      >
        {isDarkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
