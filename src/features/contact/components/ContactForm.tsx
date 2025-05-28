"use client";
import {
    Box,
    Button,
    Container,
    Typography,
    Stack,
    TextField,
    FormControl,
    FormLabel,
    TextareaAutosize,
    Paper
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { getContactContent, ContactContent } from '@/lib/data';
import { useLanguage } from '@/context/languageContext';
import { fadeIn, slideUp, buttonHover } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionStack = motion(Stack);
const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

export default function Contact() {
    const { language } = useLanguage();
    const [content, setContent] = useState<ContactContent>(getContactContent(language));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Update content when language changes
    useEffect(() => {
        setContent(getContactContent(language));
    }, [language]);

    // Animation variants
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
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
            <MotionContainer maxWidth="md" sx={{ px: { xs: 2, md: 3 } }}>
                <MotionStack spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 3, md: 4 } }}>
                    <Box component={motion.div} variants={slideUp}>
                        <Typography
                            variant="h2"
                            sx={{
                                textAlign: "center",
                                fontSize: { xs: '1.75rem', md: '2.25rem' }
                            }}
                        >
                            {content.title}
                        </Typography>
                    </Box>

                    {content.subtitle && (
                        <Box component={motion.div} variants={slideUp}>
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "center",
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    color: 'text.secondary',
                                    maxWidth: '600px',
                                    mx: 'auto'
                                }}
                            >
                                {content.subtitle}
                            </Typography>
                        </Box>
                    )}
                </MotionStack>

                <Box
                    component="form"
                    sx={{
                        borderRadius: 1,
                        overflow: 'hidden'
                    }}
                >
                    <MotionPaper
                        sx={{
                            p: { xs: 2.5, md: 4 },
                            borderRadius: 1,
                            boxShadow: 1,
                            bgcolor: 'background.paper'
                        }}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        elevation={2}
                        whileHover={{
                            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <MotionStack spacing={{ xs: 2, md: 3 }}>
                            <Box component={motion.div} variants={itemVariants} sx={{ width: "100%" }}>
                                <FormControl fullWidth required>
                                    <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                        {content.formLabels.name}
                                    </FormLabel>
                                    <TextField
                                        placeholder={content.placeholders.name}
                                        variant="outlined"
                                        fullWidth
                                        size="medium"
                                        sx={{
                                            mt: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'secondary.main',
                                                    borderWidth: 2,
                                                },
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <Box component={motion.div} variants={itemVariants} sx={{ width: "100%" }}>
                                <FormControl fullWidth required>
                                    <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                        {content.formLabels.email}
                                    </FormLabel>
                                    <TextField
                                        type="email"
                                        placeholder={content.placeholders.email}
                                        variant="outlined"
                                        fullWidth
                                        size="medium"
                                        sx={{
                                            mt: 1,
                                            '& .MuiOutlinedInput-root': {
                                                '&:hover fieldset': {
                                                    borderColor: 'secondary.main',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'secondary.main',
                                                    borderWidth: 2,
                                                },
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <Box component={motion.div} variants={itemVariants} sx={{ width: "100%" }}>
                                <FormControl fullWidth required>
                                    <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                        {content.formLabels.message}
                                    </FormLabel>
                                    <TextareaAutosize
                                        minRows={4}
                                        placeholder={content.placeholders.message}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            borderColor: '#E2E8F0',
                                            marginTop: '8px',
                                            fontSize: '1rem',
                                            minHeight: '6rem',
                                            transition: 'border-color 0.2s ease-in-out',
                                        }}
                                    />
                                </FormControl>
                            </Box>

                            <MotionButton
                                variant="contained"
                                color="secondary"
                                size="large"
                                fullWidth
                                sx={{ mt: { xs: 1, md: 2 } }}
                                variants={buttonHover}
                                whileHover="hover"
                                whileTap="tap"
                                initial="initial"
                            >
                                {content.buttonText}
                            </MotionButton>
                        </MotionStack>
                    </MotionPaper>
                </Box>
            </MotionContainer>
        </MotionBox>
    );
}