"use client";
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { getFeaturesContent, FeaturesContent, FeatureItem } from '@/lib/data';
import { useLanguage } from '@/context/languageContext';
import { fadeIn, slideUp } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

export default function Features() {
    const { language } = useLanguage();
    const [features, setFeatures] = useState<FeaturesContent>(getFeaturesContent(language));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Update content when language changes
    useEffect(() => {
        setFeatures(getFeaturesContent(language));
    }, [language]);

    // Map icon names to actual icon components
    const iconMap: Record<string, React.ElementType> = {
        ChatIcon: ChatIcon,
        TimeIcon: AccessTimeIcon,
        LinkIcon: LinkIcon,
        StarIcon: StarIcon,
        GlobeIcon: LanguageIcon,
        SettingsIcon: SettingsIcon
    };

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -5,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <MotionBox
            ref={ref}
            sx={{
                py: { xs: 5, md: 8 },
                bgcolor: 'grey.50'
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
                <MotionTypography
                    variant="h2"
                    sx={{
                        textAlign: "center",
                        mb: { xs: 4, md: 6 },
                        fontSize: { xs: '1.75rem', md: '2.25rem' }
                    }}
                    variants={slideUp}
                >
                    {features.title}
                </MotionTypography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }} component={motion.div} variants={containerVariants}>
                    {features.items.map((feature: FeatureItem, index: number) => {
                        const IconComponent = iconMap[feature.icon] || StarIcon; // Fallback to StarIcon

                        return (
                            <Box
                                key={index}
                                sx={{
                                    width: { xs: '100%', md: '50%', lg: '33.333%' },
                                    px: 2,
                                    mb: 4
                                }}
                            >
                                <MotionPaper
                                    sx={{
                                        p: { xs: 2.5, md: 3 },
                                        borderRadius: 1,
                                        boxShadow: 1,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        gap: 1.5
                                    }}
                                    variants={itemVariants}
                                    whileHover="hover"
                                    initial="initial"
                                    custom={index}
                                >
                                    <IconComponent sx={{
                                        fontSize: { xs: 32, md: 40 },
                                        color: 'secondary.main'
                                    }} />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: { xs: '1rem', md: '1.25rem' }
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontSize: { xs: '0.875rem', md: '1rem' },
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </MotionPaper>
                            </Box>
                        );
                    })}
                </Box>
            </MotionContainer>
        </MotionBox>
    );
}