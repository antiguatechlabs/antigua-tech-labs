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
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { getNavbarContent, NavbarContent } from '@/lib/data';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();
    const [content, setContent] = useState<NavbarContent>(getNavbarContent(language));

    // Update content when language changes
    useEffect(() => {
        setContent(getNavbarContent(language));
    }, [language]);

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
                <Heading size="md">{content.companyName}</Heading>

                <Flex alignItems="center">
                    {/* Language toggle button - visible on all screens */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        mr={{ base: 2, md: 4 }}
                        px={2}
                    >
                        {language === 'en' ? (
                            <span>{content.languageToggle.en} | <span style={{ opacity: 0.5 }}>{content.languageToggle.es}</span></span>
                        ) : (
                            <span><span style={{ opacity: 0.5 }}>{content.languageToggle.en}</span> | {content.languageToggle.es}</span>
                        )}
                    </Button>

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
                        <Button variant="ghost">{content.navItems.features}</Button>
                        <Button variant="ghost">{content.navItems.testimonials}</Button>
                        <Button variant="ghost">{content.navItems.pricing}</Button>
                        <Button colorScheme="teal">{content.navItems.contact}</Button>
                    </HStack>
                </Flex>

                {/* Mobile drawer menu */}
                <Drawer.Root open={isOpen}>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Title>{content.menuTitle}</Drawer.Title>
                                    <Drawer.CloseTrigger asChild onClick={onClose}>
                                        <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <VStack align="stretch" gap={4}>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            {content.navItems.features}
                                        </Button>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            {content.navItems.testimonials}
                                        </Button>
                                        <Button variant="ghost" justifyContent="flex-start" onClick={onClose}>
                                            {content.navItems.pricing}
                                        </Button>
                                        <Button colorScheme="teal" onClick={onClose}>
                                            {content.navItems.contact}
                                        </Button>

                                        {/* Divider line */}
                                        <Box borderTopWidth="1px" borderColor="gray.200" my={2} />

                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                toggleLanguage();
                                                onClose();
                                            }}
                                        >
                                            {language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
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