"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/lib/languageContext";
// import { chakraTheme } from "@/theme";

const muiTheme = createTheme();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ChakraProvider value={defaultSystem}>
                <ThemeProvider theme={muiTheme}>
                    <AnimatePresence>{children}</AnimatePresence>
                </ThemeProvider>
            </ChakraProvider>
        </LanguageProvider>
    );
}