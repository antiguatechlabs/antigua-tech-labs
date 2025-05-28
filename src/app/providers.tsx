"use client";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/context/languageContext";
import { ThemeProvider } from "@/context/themeContext";
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