"use client";
import { Box, Container, Typography, Stack, Avatar, Paper } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { getTestimonialsContent, TestimonialsContent, TestimonialItem } from '@/lib/data';
import { useLanguage } from '@/lib/languageContext';
import { fadeIn, slideInLeft, slideInRight } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionStack = motion(Stack);

export default function Testimonials() {
    const { language } = useLanguage();
    const [testimonials, setTestimonials] = useState<TestimonialsContent>(getTestimonialsContent(language));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Update content when language changes
    useEffect(() => {
        setTestimonials(getTestimonialsContent(language));
    }, [language]);

    // Generate avatar URLs using UI Avatars service
    const getAvatarUrl = (name: string) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        hover: {
            y: -5,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
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
                py: { xs: 5, md: 8 }
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
                    variants={slideInLeft}
                >
                    {testimonials.title}
                </MotionTypography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }} component={motion.div} variants={containerVariants}>
                    {testimonials.items.map((testimonial: TestimonialItem, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                width: { xs: '100%', md: '50%' },
                                px: 2,
                                mb: 4
                            }}
                        >
                            <MotionPaper
                                sx={{
                                    p: { xs: 2.5, md: 3 },
                                    bgcolor: 'grey.50',
                                    borderRadius: 1,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                                variants={cardVariants}
                                whileHover="hover"
                                custom={index}
                            >
                                <Box component={motion.div} variants={slideInRight}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontSize: { xs: '1rem', md: '1.125rem' },
                                            fontStyle: "italic",
                                            mb: 2
                                        }}
                                    >
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </Typography>
                                </Box>

                                <MotionStack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 'auto' }}
                                >
                                    <Avatar
                                        alt={testimonial.name}
                                        src={testimonial.avatar || getAvatarUrl(testimonial.name)}
                                        sx={{
                                            width: { xs: 40, md: 48 },
                                            height: { xs: 40, md: 48 }
                                        }}
                                    />
                                    <Stack spacing={0}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: { xs: '0.875rem', md: '1rem' }
                                            }}
                                        >
                                            {testimonial.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                                color: 'text.secondary'
                                            }}
                                        >
                                            {testimonial.title}, {testimonial.company}
                                        </Typography>
                                    </Stack>
                                </MotionStack>
                            </MotionPaper>
                        </Box>
                    ))}
                </Box>
            </MotionContainer>
        </MotionBox>
    );
}