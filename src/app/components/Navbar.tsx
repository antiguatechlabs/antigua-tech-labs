"use client";
import {
    Box,
    Button,
    Heading,
    HStack,
    Flex,
    Drawer,
    CloseButton,
    Portal,
    VStack
} from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <Box as="header" boxShadow="sm">
            <Flex
                maxW="container.xl"
                mx="auto"
                p={4}
                alignItems="center"
                justifyContent="space-between"
            >
                <Heading size="md">Antigua Digital</Heading>

                {/* Mobile menu button - only visible on small screens */}
                <Box display={{ base: 'flex', md: 'none' }}>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        onClick={onOpen}
                    >
                        <MenuIcon />
                    </Button>
                </Box>

                {/* Desktop navigation - hidden on mobile */}
                <HStack gap={2} display={{ base: 'none', md: 'flex' }}>
                    <Button variant="ghost">Features</Button>
                    <Button variant="ghost">Testimonials</Button>
                    <Button variant="ghost">Pricing</Button>
                    <Button colorScheme="teal">Contact</Button>
                </HStack>

                {/* Mobile drawer menu */}
                <Drawer.Root open={isOpen}>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Title>Menu</Drawer.Title>
                                    <Drawer.CloseTrigger asChild onClick={onClose}>
                                        <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <VStack align="stretch" gap={4}>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            Features
                                        </Button>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            Testimonials
                                        </Button>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            Pricing
                                        </Button>
                                        <Button colorScheme="teal" onClick={onClose}>
                                            Contact
                                        </Button>
                                    </VStack>
                                </Drawer.Body>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Flex>
        </Box>
    );
}