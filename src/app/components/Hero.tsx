"use client";
import { Button, Container, Heading, Text, VStack, Box } from '@chakra-ui/react';
import { getHeroContent } from '@/lib/data';

export default function Hero() {
    const content = getHeroContent();

    return (
        <Box w="100%" py={{ base: 12, md: 20 }}>
            <Container maxW={{ base: "100%", md: "container.md" }} px={4}>
                <VStack gap={{ base: 4, md: 6 }} align="center" textAlign="center">
                    <Heading
                        size={{ base: "xl", md: "2xl" }}
                        lineHeight="1.2"
                    >
                        {content.title}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", md: "xl" }}
                        maxW="container.sm"
                    >
                        {content.subtitle}
                    </Text>
                    <Button
                        colorScheme="teal"
                        size={{ base: "md", md: "lg" }}
                        width={{ base: "100%", md: "auto" }}
                        mt={{ base: 2, md: 4 }}
                    >
                        {content.cta}
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}