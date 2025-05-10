"use client";
import { Box, Button, Container, Heading, VStack } from '@chakra-ui/react';
import { TextField, FormControl, FormLabel, TextareaAutosize } from '@mui/material';
import { getContactContent } from '@/lib/data';

export default function Contact() {
    const content = getContactContent();

    return (
        <Box py={16} bg="gray.50">
            <Container maxW="container.md">
                <Heading textAlign="center" mb={8}>{content.title}</Heading>
                <VStack as="form" gap={4}>
                    <FormControl fullWidth required>
                        <FormLabel>Name</FormLabel>
                        <TextField placeholder="Your name" variant="outlined" fullWidth />
                    </FormControl>
                    <FormControl fullWidth required>
                        <FormLabel>Email</FormLabel>
                        <TextField type="email" placeholder="your.email@example.com" variant="outlined" fullWidth />
                    </FormControl>
                    <FormControl fullWidth required>
                        <FormLabel>Message</FormLabel>
                        <TextareaAutosize
                            minRows={6}
                            placeholder="How can we help you?"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#E2E8F0' }}
                        />
                    </FormControl>
                    <Button colorScheme="teal" size="lg" width="full">{content.buttonText}</Button>
                </VStack>
            </Container>
        </Box>
    );
}