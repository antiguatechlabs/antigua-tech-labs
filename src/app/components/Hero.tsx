import { Button, Container, Heading, Text } from '@chakra-ui/react';
import { getHeroContent } from '@/lib/data';

export default function Hero() {
    const content = getHeroContent();

    return (
        <Container centerContent py={20}>
            <Heading size="2xl">{content.title}</Heading>
            <Text fontSize="xl" mt={4}>{content.subtitle}</Text>
            <Button colorScheme="teal" size="lg" mt={6}>{content.cta}</Button>
        </Container>
    );
}