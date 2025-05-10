"use client";
import { Box, Button, Container, Heading, VStack, Text } from '@chakra-ui/react';
import { TextField, FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { getContactContent } from '@/lib/data';

export default function Contact() {
    const content = getContactContent();

    return (
        <Box py={{ base: 10, md: 16 }} bg="gray.50">
            <Container maxW="container.md" px={{ base: 4, md: 6 }}>
                <VStack gap={{ base: 6, md: 8 }} mb={{ base: 6, md: 8 }}>
                    <Heading
                        textAlign="center"
                        fontSize={{ base: "2xl", md: "3xl" }}
                    >
                        {content.title}
                    </Heading>
                    {content.subtitle && (
                        <Text
                            textAlign="center"
                            fontSize={{ base: "md", md: "lg" }}
                            color="gray.600"
                            maxW="container.sm"
                        >
                            {content.subtitle}
                        </Text>
                    )}
                </VStack>

                <Box
                    as="form"
                    bg="white"
                    p={{ base: 5, md: 8 }}
                    borderRadius="md"
                    boxShadow="sm"
                >
                    <VStack gap={{ base: 4, md: 6 }}>
                        <FormControl fullWidth required>
                            <FormLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                Name
                            </FormLabel>
                            <TextField
                                placeholder="Your name"
                                variant="outlined"
                                fullWidth
                                size="medium"
                                sx={{ mt: 1 }}
                            />
                        </FormControl>
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
                                sx={{ mt: 1 }}
                            />
                        </FormControl>
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
                                }}
                            />
                        </FormControl>
                        <Button
                            colorScheme="teal"
                            size={{ base: "md", md: "lg" }}
                            width="full"
                            mt={{ base: 2, md: 4 }}
                        >
                            {content.buttonText}
                        </Button>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
}