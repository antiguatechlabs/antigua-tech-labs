"use client";
import { Button, Container, Heading, Text, VStack, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { getHeroContent } from '@/lib/data';
import { fadeIn, slideUp, staggerContainer, buttonHover } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

export default function Hero() {
    const content = getHeroContent();

    return (
        <MotionBox
            w="100%"
            py={{ base: 12, md: 20 }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <MotionContainer
                maxW={{ base: "100%", md: "container.md" }}
                px={4}
            >
                <MotionVStack
                    gap={{ base: 4, md: 6 }}
                    align="center"
                    textAlign="center"
                    variants={staggerContainer}
                >
                    <MotionHeading
                        size={{ base: "xl", md: "2xl" }}
                        lineHeight="1.2"
                        variants={slideUp}
                    >
                        {content.title}
                    </MotionHeading>
                    <MotionText
                        fontSize={{ base: "md", md: "xl" }}
                        maxW="container.sm"
                        variants={slideUp}
                    >
                        {content.subtitle}
                    </MotionText>
                    <MotionButton
                        colorScheme="teal"
                        size={{ base: "md", md: "lg" }}
                        width={{ base: "100%", md: "auto" }}
                        mt={{ base: 2, md: 4 }}
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
                </MotionVStack>
            </MotionContainer>
        </MotionBox>
    );
}