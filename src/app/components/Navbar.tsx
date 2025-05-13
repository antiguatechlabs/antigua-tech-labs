"use client";
import {
    Box,
    Button,
    Typography,
    Stack,
    AppBar,
    Toolbar,
    Drawer,
    IconButton,
    Divider,
    Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
        <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ py: 1 }}>
                    <Typography variant="h6" component="h1" sx={{ flexGrow: { xs: 1, md: 0 } }}>
                        {content.companyName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                        {/* Language toggle button - visible on all screens */}
                        <Button
                            variant="text"
                            size="small"
                            onClick={toggleLanguage}
                            sx={{ mr: { xs: 1, md: 2 }, px: 1 }}
                        >
                            {language === 'en' ? (
                                <span>{content.languageToggle.en} | <span style={{ opacity: 0.5 }}>{content.languageToggle.es}</span></span>
                            ) : (
                                <span><span style={{ opacity: 0.5 }}>{content.languageToggle.en}</span> | {content.languageToggle.es}</span>
                            )}
                        </Button>

                        {/* Mobile menu button - only visible on small screens */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                aria-label="Open menu"
                                onClick={onOpen}
                                size="medium"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Desktop navigation - hidden on mobile */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            <Button variant="text">{content.navItems.features}</Button>
                            <Button variant="text">{content.navItems.testimonials}</Button>
                            <Button variant="text">{content.navItems.pricing}</Button>
                            <Button variant="contained" color="secondary">{content.navItems.contact}</Button>
                        </Stack>
                    </Box>

                    {/* Mobile drawer menu */}
                    <Drawer
                        anchor="right"
                        open={isOpen}
                        onClose={onClose}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: { xs: '100%', sm: 300 },
                                boxSizing: 'border-box',
                                p: 2
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">{content.menuTitle}</Typography>
                            <IconButton onClick={onClose} aria-label="Close menu">
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Button
                                variant="text"
                                fullWidth
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={onClose}
                            >
                                {content.navItems.features}
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={onClose}
                            >
                                {content.navItems.testimonials}
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={onClose}
                            >
                                {content.navItems.pricing}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={onClose}
                            >
                                {content.navItems.contact}
                            </Button>

                            {/* Divider line */}
                            <Divider sx={{ my: 1 }} />

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                    toggleLanguage();
                                    onClose();
                                }}
                            >
                                {language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
                            </Button>
                        </Stack>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
}