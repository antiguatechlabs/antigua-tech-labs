"use client";
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
        <Box py={{ base: 10, md: 16 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Heading
                    textAlign="center"
                    mb={{ base: 8, md: 12 }}
                    fontSize={{ base: "2xl", md: "3xl" }}
                >
                    {testimonials.title}
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={{ base: 6, md: 10 }}
                    mx="auto"
                >
                    {testimonials.items.map((testimonial: TestimonialItem, index: number) => (
                        <Box
                            key={index}
                            p={{ base: 5, md: 6 }}
                            bg="gray.50"
                            borderRadius="md"
                            height="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Text
                                fontSize={{ base: "md", md: "lg" }}
                                fontStyle="italic"
                                mb={4}
                            >
                                &ldquo;{testimonial.quote}&rdquo;
                            </Text>
                            <HStack gap={3} mt="auto">
                                <Avatar
                                    alt={testimonial.name}
                                    src={getAvatarUrl(testimonial.name)}
                                    sx={{
                                        width: { xs: 40, md: 48 },
                                        height: { xs: 40, md: 48 }
                                    }}
                                />
                                <VStack align="start" gap={0}>
                                    <Text
                                        fontWeight="bold"
                                        fontSize={{ base: "sm", md: "md" }}
                                    >
                                        {testimonial.name}
                                    </Text>
                                    <Text
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="gray.600"
                                    >
                                        {testimonial.title}, {testimonial.company}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}