"use client";
import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { getFeaturesContent } from '@/lib/data';

interface FeatureItem {
    title: string;
    description: string;
    icon: string;
}

export default function Features() {
    const features = getFeaturesContent();

    // Map icon names to actual icon components
    const iconMap: Record<string, React.ElementType> = {
        ChatIcon: ChatIcon,
        TimeIcon: AccessTimeIcon,
        LinkIcon: LinkIcon,
        StarIcon: StarIcon,
        GlobeIcon: LanguageIcon,
        SettingsIcon: SettingsIcon
    };

    return (
        <Box py={{ base: 10, md: 16 }} bg="gray.50">
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Heading
                    textAlign="center"
                    mb={{ base: 8, md: 12 }}
                    fontSize={{ base: "2xl", md: "3xl" }}
                >
                    {features.title}
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: 6, md: 10 }}
                    mx="auto"
                >
                    {features.items.map((feature: FeatureItem, index: number) => {
                        const IconComponent = iconMap[feature.icon] || StarIcon; // Fallback to StarIcon

                        return (
                            <VStack
                                key={index}
                                align="start"
                                p={{ base: 5, md: 6 }}
                                bg="white"
                                borderRadius="md"
                                boxShadow="sm"
                                gap={3}
                                height="100%"
                            >
                                <IconComponent sx={{
                                    fontSize: { xs: 32, md: 40 },
                                    color: 'teal.500'
                                }} />
                                <Heading
                                    size={{ base: "sm", md: "md" }}
                                    fontWeight="600"
                                >
                                    {feature.title}
                                </Heading>
                                <Text fontSize={{ base: "sm", md: "md" }}>
                                    {feature.description}
                                </Text>
                            </VStack>
                        );
                    })}
                </SimpleGrid>
            </Container>
        </Box>
    );
}