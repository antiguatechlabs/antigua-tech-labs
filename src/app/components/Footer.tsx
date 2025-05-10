import { Box, Container, Link, Text, SimpleGrid, Stack, Heading } from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box bg="gray.800" color="white" py={10}>
            <Container maxW="container.xl">
                <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
                    <Stack gap={6}>
                        <Heading size="md">Antigua Digital</Heading>
                        <Text>AI-powered solutions for modern businesses.</Text>
                    </Stack>
                    <Stack>
                        <Heading size="sm" mb={4}>Product</Heading>
                        <Link>Features</Link>
                        <Link>Pricing</Link>
                        <Link>Case Studies</Link>
                        <Link>Documentation</Link>
                    </Stack>
                    <Stack>
                        <Heading size="sm" mb={4}>Company</Heading>
                        <Link>About</Link>
                        <Link>Team</Link>
                        <Link>Careers</Link>
                        <Link>Contact</Link>
                    </Stack>
                    <Stack>
                        <Heading size="sm" mb={4}>Legal</Heading>
                        <Link>Privacy Policy</Link>
                        <Link>Terms of Service</Link>
                    </Stack>
                </SimpleGrid>
                <Text mt={10} pt={6} borderTop="1px" borderColor="gray.700" textAlign="center">
                    © {new Date().getFullYear()} Antigua Digital. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
}