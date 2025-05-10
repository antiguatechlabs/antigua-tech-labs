import { Box, Container, Heading, Text, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { Avatar } from '@mui/material';
import { getTestimonialsContent } from '@/lib/data';

interface TestimonialItem {
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
}

export default function Testimonials() {
    const testimonials = getTestimonialsContent();

    // Generate avatar URLs using UI Avatars service
    const getAvatarUrl = (name: string) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;
    };

    return (
        <Box py={16}>
            <Container maxW="container.xl">
                <Heading textAlign="center" mb={12}>{testimonials.title}</Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
                    {testimonials.items.map((testimonial: TestimonialItem, index: number) => (
                        <Box key={index} p={6} bg="gray.50" borderRadius="md">
                            <Text fontSize="lg" fontStyle="italic" mb={4}>&ldquo;{testimonial.quote}&rdquo;</Text>
                            <HStack>
                                <Avatar
                                    alt={testimonial.name}
                                    src={getAvatarUrl(testimonial.name)}
                                    sx={{ width: 48, height: 48 }}
                                />
                                <VStack align="start" gap={0}>
                                    <Text fontWeight="bold">{testimonial.name}</Text>
                                    <Text fontSize="sm">{testimonial.title}, {testimonial.company}</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}