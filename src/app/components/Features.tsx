"use client";
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { getFeaturesContent, FeaturesContent, FeatureItem } from '@/lib/data';
import { useLanguage } from '@/lib/languageContext';
import { fadeIn, slideUp } from '@/lib/animations';

// Create motion components
const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionHeading = motion(Heading);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);

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
            py={{ base: 10, md: 16 }}
            bg="gray.50"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <MotionContainer maxW="container.xl" px={{ base: 4, md: 6 }}>
                <MotionHeading
                    textAlign="center"
                    mb={{ base: 8, md: 12 }}
                    fontSize={{ base: "2xl", md: "3xl" }}
                    variants={slideUp}
                >
                    {features.title}
                </MotionHeading>
                <MotionSimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: 6, md: 10 }}
                    mx="auto"
                    variants={containerVariants}
                >
                    {features.items.map((feature: FeatureItem, index: number) => {
                        const IconComponent = iconMap[feature.icon] || StarIcon; // Fallback to StarIcon

                        return (
                            <MotionVStack
                                key={index}
                                align="start"
                                p={{ base: 5, md: 6 }}
                                bg="white"
                                borderRadius="md"
                                boxShadow="sm"
                                gap={3}
                                height="100%"
                                variants={itemVariants}
                                whileHover="hover"
                                initial="initial"
                                custom={index}
                            >
                                <IconComponent sx={{
                                    fontSize: { xs: 32, md: 40 },
                                    color: 'teal.500'
                                }} />
                                <MotionHeading
                                    size={{ base: "sm", md: "md" }}
                                    fontWeight="600"
                                >
                                    {feature.title}
                                </MotionHeading>
                                <MotionText fontSize={{ base: "sm", md: "md" }}>
                                    {feature.description}
                                </MotionText>
                            </MotionVStack>
                        );
                    })}
                </MotionSimpleGrid>
            </MotionContainer>
        </MotionBox>
    );
}