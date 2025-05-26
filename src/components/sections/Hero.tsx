"use client";
import { Button, Container, Typography, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getHeroContent, HeroContent } from '@/lib/data';
import { useLanguage } from '@/lib/languageContext';
import { fadeIn, slideUp, staggerContainer, buttonHover } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionStack = motion(Stack);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

export default function Hero() {
    const { language } = useLanguage();
    const [content, setContent] = useState<HeroContent>(getHeroContent(language));

    // Update content when language changes
    useEffect(() => {
        setContent(getHeroContent(language));
    }, [language]);

    return (
        <MotionBox
            sx={{
                width: "100%",
                py: { xs: 6, md: 10 },
                mt: { xs: '72px', md: '72px' } // Exact height of the main header
            }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <MotionContainer
                maxWidth="md"
                sx={{
                    px: 2
                }}
            >
                <MotionStack
                    spacing={{ xs: 2, md: 3 }}
                    alignItems="center"
                    sx={{ textAlign: "center" }}
                    variants={staggerContainer}
                >
                    <MotionTypography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '2.25rem', md: '3rem' },
                            lineHeight: 1.2
                        }}
                        variants={slideUp}
                    >
                        {content.title}
                    </MotionTypography>
                    <MotionTypography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            maxWidth: 'sm',
                            color: 'text.secondary'
                        }}
                        variants={slideUp}
                    >
                        {content.subtitle}
                    </MotionTypography>
                    <MotionButton
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            width: { xs: '100%', md: 'auto' },
                            mt: { xs: 1, md: 2 },
                            px: 4
                        }}
                        variants={{
                            ...slideUp,
                            initial: buttonHover.initial,
                            hover: buttonHover.hover,
                            tap: buttonHover.tap
                        }}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {content.cta}
                    </MotionButton>
                </MotionStack>
            </MotionContainer>
        </MotionBox>
    );
}