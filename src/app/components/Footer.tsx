"use client";
import {
    Box,
    Container,
    Typography,
    Link as MuiLink,
    Divider
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { getFooterContent } from '@/lib/data';
import { fadeIn } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionDivider = motion(Divider);
const MotionTypography = motion(Typography);

// Define the footer content interface
interface FooterContent {
    companyName: string;
    companyDescription: string;
    sections: {
        product: {
            title: string;
            links: string[];
        };
        company: {
            title: string;
            links: string[];
        };
        legal: {
            title: string;
            links: string[];
        };
    };
    copyright: string;
}

export default function Footer() {
    const { language } = useLanguage();
    const [content, setContent] = useState<FooterContent>(getFooterContent(language));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    // Update content when language changes
    useEffect(() => {
        setContent(getFooterContent(language));
    }, [language]);

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const linkVariants = {
        visible: {
            opacity: 1,
            color: "white",
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        hover: {
            x: 5,
            color: "#4FD1C5", // teal.300
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <MotionBox
            ref={ref}
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                py: { xs: 4, md: 5 }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: { xs: 3, md: 4 },
                    mb: { xs: 4, md: 5 }
                }}>
                    {/* Company info - full width on mobile */}
                    <Box sx={{ gridColumn: { xs: '1 / span 2', md: '1 / span 1' } }}>
                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                            >
                                {content.companyName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                            >
                                {content.companyDescription}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Product Links */}
                    <Box>
                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    fontWeight: 'bold',
                                    mb: { xs: 1, md: 2 }
                                }}
                            >
                                {content.sections.product.title}
                            </Typography>
                            {content.sections.product.links.map((link: string, index: number) => (
                                <MuiLink
                                    key={index}
                                    component={motion.a}
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        py: 0.5,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                    variants={linkVariants}
                                    whileHover="hover"
                                >
                                    {link}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>

                    {/* Company Links */}
                    <Box>
                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    fontWeight: 'bold',
                                    mb: { xs: 1, md: 2 }
                                }}
                            >
                                {content.sections.company.title}
                            </Typography>
                            {content.sections.company.links.map((link: string, index: number) => (
                                <MuiLink
                                    key={index}
                                    component={motion.a}
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        py: 0.5,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                    variants={linkVariants}
                                    whileHover="hover"
                                >
                                    {link}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>

                    {/* Legal Links */}
                    <Box>
                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    fontWeight: 'bold',
                                    mb: { xs: 1, md: 2 }
                                }}
                            >
                                {content.sections.legal.title}
                            </Typography>
                            {content.sections.legal.links.map((link: string, index: number) => (
                                <MuiLink
                                    key={index}
                                    component={motion.a}
                                    href="#"
                                    underline="hover"
                                    sx={{
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        py: 0.5,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                    variants={linkVariants}
                                    whileHover="hover"
                                >
                                    {link}
                                </MuiLink>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Divider line */}
                <MotionDivider
                    sx={{ borderColor: 'grey.800' }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                />

                <MotionTypography
                    variant="body2"
                    sx={{
                        mt: { xs: 3, md: 4 },
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        textAlign: 'center'
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    {content.copyright.replace('{year}', new Date().getFullYear().toString())}
                </MotionTypography>
            </MotionContainer>
        </MotionBox>
    );
}