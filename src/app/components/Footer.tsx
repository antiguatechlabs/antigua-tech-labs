"use client";
import { Box, Container, Link, Text, SimpleGrid, Stack, Heading } from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box bg="gray.800" color="white" py={{ base: 8, md: 10 }}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <SimpleGrid
                    columns={{ base: 2, md: 4 }}
                    gap={{ base: 6, md: 8 }}
                    mb={{ base: 8, md: 10 }}
                >
                    {/* Company info - full width on mobile */}
                    <Stack gap={3} gridColumn={{ base: "span 2", md: "span 1" }}>
                        <Heading size={{ base: "sm", md: "md" }}>Antigua Digital</Heading>
                        <Text fontSize={{ base: "sm", md: "md" }}>
                            AI-powered solutions for modern businesses.
                        </Text>
                    </Stack>

                    {/* Links - 2 columns on mobile, 3 columns on desktop */}
                    <Stack gap={2}>
                        <Heading size="sm" mb={{ base: 2, md: 4 }}>Product</Heading>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Features</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Pricing</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Case Studies</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Documentation</Link>
                    </Stack>

                    <Stack gap={2}>
                        <Heading size="sm" mb={{ base: 2, md: 4 }}>Company</Heading>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>About</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Team</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Careers</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Contact</Link>
                    </Stack>

                    <Stack gap={2}>
                        <Heading size="sm" mb={{ base: 2, md: 4 }}>Legal</Heading>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Privacy Policy</Link>
                        <Link fontSize={{ base: "sm", md: "md" }} py={1}>Terms of Service</Link>
                    </Stack>
                </SimpleGrid>

                {/* Divider line */}
                <Box borderTopWidth="1px" borderColor="gray.700" />

                <Text
                    mt={{ base: 6, md: 8 }}
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign="center"
                >
                    © {new Date().getFullYear()} Antigua Digital. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
}