"use client";
import { Box, Container, Heading, Text, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Avatar } from '@mui/material';
import { getTestimonialsContent } from '@/lib/data';
import { fadeIn, slideInLeft, slideInRight } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionSimpleGrid = motion(SimpleGrid);

interface TestimonialItem {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
}

export default function Testimonials() {
    const testimonials = getTestimonialsContent();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            py={{ base: 10, md: 16 }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxW="container.xl" px={{ base: 4, md: 6 }}>
                <MotionHeading
                    textAlign="center"
                    mb={{ base: 8, md: 12 }}
                    fontSize={{ base: "2xl", md: "3xl" }}
                    variants={slideInLeft}
                >
                    {testimonials.title}
                </MotionHeading>
                <MotionSimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={{ base: 6, md: 10 }}
                    mx="auto"
                    variants={containerVariants}
                >
                    {testimonials.items.map((testimonial: TestimonialItem, index: number) => (
                        <MotionBox
                            key={index}
                            p={{ base: 5, md: 6 }}
                            bg="gray.50"
                            borderRadius="md"
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            variants={cardVariants}
                            whileHover="hover"
                            custom={index}
                        >
                            <MotionText
                                fontSize={{ base: "md", md: "lg" }}
                                fontStyle="italic"
                                mb={4}
                                variants={slideInRight}
                            >
                                &ldquo;{testimonial.quote}&rdquo;
                            </MotionText>
                            <MotionHStack gap={3} mt="auto">
                                <Avatar
                                    alt={testimonial.name}
                                    src={getAvatarUrl(testimonial.name)}
                                    sx={{
                                        width: { xs: 40, md: 48 },
                                        height: { xs: 40, md: 48 }
                                    }}
                                />
                                <MotionVStack align="start" gap={0}>
                                    <MotionText
                                        fontWeight="bold"
                                        fontSize={{ base: "sm", md: "md" }}
                                    >
                                        {testimonial.name}
                                    </MotionText>
                                    <MotionText
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="gray.600"
                                    >
                                        {testimonial.title}, {testimonial.company}
                                    </MotionText>
                                </MotionVStack>
                            </MotionHStack>
                        </MotionBox>
                    ))}
                </MotionSimpleGrid>
            </MotionContainer>
        </MotionBox>
    );
}