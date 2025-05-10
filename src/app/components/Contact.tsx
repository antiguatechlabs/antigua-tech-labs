"use client";
import { Box, Button, Container, Heading, VStack, Text } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TextField, FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { getContactContent } from '@/lib/data';
import { fadeIn, slideUp, buttonHover } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

export default function Contact() {
    const content = getContactContent();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            py={{ base: 10, md: 16 }}
            bg="gray.50"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxW="container.md" px={{ base: 4, md: 6 }}>
                <MotionVStack gap={{ base: 6, md: 8 }} mb={{ base: 6, md: 8 }}>
                    <MotionHeading
                        textAlign="center"
                        fontSize={{ base: "2xl", md: "3xl" }}
                        variants={slideUp}
                    >
                        {content.title}
                    </MotionHeading>
                    {content.subtitle && (
                        <MotionText
                            textAlign="center"
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="container.sm"
                            variants={slideUp}
                        >
                            {content.subtitle}
                        </MotionText>
                    )}
                </MotionVStack>

                <MotionBox
                    as="form"
                    bg="white"
                    p={{ base: 5, md: 8 }}
                    borderRadius="md"
                    boxShadow="sm"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <MotionVStack gap={{ base: 4, md: 6 }}>
                        <MotionBox variants={itemVariants} width="100%">
                            <FormControl fullWidth required>
                                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                    Name
                                </FormLabel>
                                <TextField
                                    placeholder="Your name"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    sx={{
                                        mt: 1,
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: 'teal',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'teal',
                                                borderWidth: 2,
                                            },
                                        },
                                    }}
                                />
                            </FormControl>
                        </MotionBox>

                        <MotionBox variants={itemVariants} width="100%">
                            <FormControl fullWidth required>
                                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                    Email
                                </FormLabel>
                                <TextField
                                    type="email"
                                    placeholder="your.email@example.com"
                                    variant="outlined"
                                    fullWidth
                                    size="medium"
                                    sx={{
                                        mt: 1,
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: 'teal',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'teal',
                                                borderWidth: 2,
                                            },
                                        },
                                    }}
                                />
                            </FormControl>
                        </MotionBox>

                        <MotionBox variants={itemVariants} width="100%">
                            <FormControl fullWidth required>
                                <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                    Message
                                </FormLabel>
                                <TextareaAutosize
                                    minRows={4}
                                    placeholder="How can we help you?"
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
                        </MotionBox>

                        <MotionButton
                            colorScheme="teal"
                            size={{ base: "md", md: "lg" }}
                            width="full"
                            mt={{ base: 2, md: 4 }}
                            variants={buttonHover}
                            whileHover="hover"
                            whileTap="tap"
                            initial="initial"
                        >
                            {content.buttonText}
                        </MotionButton>
                    </MotionVStack>
                </MotionBox>
            </MotionContainer>
        </MotionBox>
    );
}