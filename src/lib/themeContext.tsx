'use client';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createContext, useContext, ReactNode } from 'react';

import { createAppTheme } from '@/theme';

type ThemeMode = 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Fixed light theme
  const themeMode: ThemeMode = 'light';

  // Create MUI theme based on light mode
  const muiTheme = createAppTheme(themeMode);

  return (
    <ThemeContext.Provider value={{ themeMode }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
