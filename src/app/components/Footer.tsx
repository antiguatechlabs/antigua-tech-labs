"use client";
import { Box, Container, Link, Text, SimpleGrid, Stack, Heading } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { getFooterContent } from '@/lib/data';
import { fadeIn } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionLink = motion(Link);

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
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

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
            bg="gray.800"
            color="white"
            py={{ base: 8, md: 10 }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxW="container.xl" px={{ base: 4, md: 6 }}>
                <MotionSimpleGrid
                    columns={{ base: 2, md: 4 }}
                    gap={{ base: 6, md: 8 }}
                    mb={{ base: 8, md: 10 }}
                    variants={containerVariants}
                >
                    {/* Company info - full width on mobile */}
                    <MotionStack
                        gap={3}
                        gridColumn={{ base: "span 2", md: "span 1" }}
                        variants={itemVariants}
                    >
                        <MotionHeading size={{ base: "sm", md: "md" }}>
                            {content.companyName}
                        </MotionHeading>
                        <MotionText fontSize={{ base: "sm", md: "md" }}>
                            {content.companyDescription}
                        </MotionText>
                    </MotionStack>

                    {/* Product Links */}
                    <MotionStack gap={2} variants={itemVariants}>
                        <MotionHeading size="sm" mb={{ base: 2, md: 4 }}>
                            {content.sections.product.title}
                        </MotionHeading>
                        {content.sections.product.links.map((link: string, index: number) => (
                            <MotionLink
                                key={index}
                                fontSize={{ base: "sm", md: "md" }}
                                py={1}
                                variants={linkVariants}
                                whileHover="hover"
                            >
                                {link}
                            </MotionLink>
                        ))}
                    </MotionStack>

                    {/* Company Links */}
                    <MotionStack gap={2} variants={itemVariants}>
                        <MotionHeading size="sm" mb={{ base: 2, md: 4 }}>
                            {content.sections.company.title}
                        </MotionHeading>
                        {content.sections.company.links.map((link: string, index: number) => (
                            <MotionLink
                                key={index}
                                fontSize={{ base: "sm", md: "md" }}
                                py={1}
                                variants={linkVariants}
                                whileHover="hover"
                            >
                                {link}
                            </MotionLink>
                        ))}
                    </MotionStack>

                    {/* Legal Links */}
                    <MotionStack gap={2} variants={itemVariants}>
                        <MotionHeading size="sm" mb={{ base: 2, md: 4 }}>
                            {content.sections.legal.title}
                        </MotionHeading>
                        {content.sections.legal.links.map((link: string, index: number) => (
                            <MotionLink
                                key={index}
                                fontSize={{ base: "sm", md: "md" }}
                                py={1}
                                variants={linkVariants}
                                whileHover="hover"
                            >
                                {link}
                            </MotionLink>
                        ))}
                    </MotionStack>
                </MotionSimpleGrid>

                {/* Divider line */}
                <MotionBox
                    borderTopWidth="1px"
                    borderColor="gray.700"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                />

                <MotionText
                    mt={{ base: 6, md: 8 }}
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign="center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    {content.copyright.replace('{year}', new Date().getFullYear().toString())}
                </MotionText>
            </MotionContainer>
        </MotionBox>
    );
}