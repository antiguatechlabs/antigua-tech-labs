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
        <Box py={16} bg="gray.50">
            <Container maxW="container.xl">
                <Heading textAlign="center" mb={12}>{features.title}</Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
                    {features.items.map((feature: FeatureItem, index: number) => {
                        const IconComponent = iconMap[feature.icon] || StarIcon; // Fallback to StarIcon

                        return (
                            <VStack key={index} align="start" p={6} bg="white" borderRadius="md" boxShadow="sm">
                                <IconComponent sx={{ fontSize: 40, color: 'teal.500' }} />
                                <Heading size="md">{feature.title}</Heading>
                                <Text>{feature.description}</Text>
                            </VStack>
                        );
                    })}
                </SimpleGrid>
            </Container>
        </Box>
    );
}