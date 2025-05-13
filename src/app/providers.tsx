"use client";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/lib/languageContext";
import { ThemeProvider } from "@/lib/themeContext";
import { CssBaseline } from "@mui/material";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <CssBaseline />
                <AnimatePresence>{children}</AnimatePresence>
            </ThemeProvider>
        </LanguageProvider>
    );
}