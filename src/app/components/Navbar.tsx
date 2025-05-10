"use client";
import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';

export default function Navbar() {
    return (
        <Flex as="nav" p={4} alignItems="center" boxShadow="sm">
            <Heading size="md">Antigua Digital</Heading>
            <Spacer />
            <Box>
                <Button variant="ghost" mr={2}>Features</Button>
                <Button variant="ghost" mr={2}>Testimonials</Button>
                <Button variant="ghost" mr={2}>Pricing</Button>
                <Button colorScheme="teal">Contact</Button>
            </Box>
        </Flex>
    );
}