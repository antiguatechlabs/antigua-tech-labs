"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    IconButton,
    Stack,
    Link as MuiLink,
    useTheme,
    useMediaQuery,
    Avatar,
    Paper
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import { getNavbarContent } from "@/lib/data";

// Import MobileMenu component
import MobileMenu from "./MobileMenu";

interface HeaderProps {
    handleSidebar: () => void;
}

const Header = ({ handleSidebar }: HeaderProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery(theme.breakpoints.down('md'));

    const { language, toggleLanguage } = useLanguage();
    const [content, setContent] = useState(getNavbarContent(language));

    // Update content when language changes
    useEffect(() => {
        setContent(getNavbarContent(language));
    }, [language]);

    // State for sticky header and mobile menu
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Toggle body class for preventing scroll when menu is open
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    return (
        <Box component="header" sx={{ position: "relative", zIndex: 999 }}>
            {/* Main Header */}
            <Box
                sx={{
                    bgcolor: 'secondary.main',
                    transition: 'all 0.3s ease',
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    left: 0,
                }}
            >
                <Container maxWidth="xl" sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Left Side - Logo and Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/" passHref>
                                <MuiLink sx={{ display: 'block', textDecoration: 'none', color: 'white' }}>
                                    <Typography variant="h6" component="h1">
                                        {content.companyName}
                                    </Typography>
                                </MuiLink>
                            </Link>

                            {/* Desktop Menu - Hidden on mobile */}
                            {!isMobile && (
                                <Stack direction="row" spacing={2} sx={{ ml: 5 }}>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                                    >
                                        {content.navItems.features}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                                    >
                                        {content.navItems.testimonials}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                                    >
                                        {content.navItems.pricing}
                                    </Button>
                                </Stack>
                            )}
                        </Box>

                        {/* Right Side - Contact and CTA */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Language toggle button */}
                            <Button
                                variant="text"
                                size="small"
                                onClick={toggleLanguage}
                                color="inherit"
                                sx={{
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                                    mr: 1
                                }}
                            >
                                {language === 'en' ? (
                                    <span>{content.languageToggle.en} | <span style={{ opacity: 0.5 }}>{content.languageToggle.es}</span></span>
                                ) : (
                                    <span><span style={{ opacity: 0.5 }}>{content.languageToggle.en}</span> | {content.languageToggle.es}</span>
                                )}
                            </Button>

                            {/* Contact Info - Hidden on mobile */}
                            {!isMedium && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'secondary.light',
                                            width: 32,
                                            height: 32
                                        }}
                                    >
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 500 }}>
                                            Need help?
                                        </Typography>
                                        <MuiLink
                                            href="tel:+1234567890"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 700,
                                                color: 'white',
                                                textDecoration: 'none',
                                                display: 'block',
                                                '&:hover': { color: 'secondary.light' }
                                            }}
                                        >
                                            (123) 456-7890
                                        </MuiLink>
                                    </Box>
                                </Box>
                            )}

                            {/* CTA Button */}
                            {!isSmall && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    sx={{
                                        ml: { xs: 0, md: 3 },
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}
                                >
                                    Get Started
                                </Button>
                            )}

                            {/* Mobile Menu Toggle */}
                            {isMobile && (
                                <IconButton
                                    aria-label="Open menu"
                                    color="inherit"
                                    onClick={toggleMobileMenu}
                                    sx={{ ml: { xs: 0, sm: 2 } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Sticky Header - Shows on scroll */}
            <Paper
                elevation={3}
                sx={{
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    left: 0,
                    transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.3s ease',
                    visibility: isSticky ? 'visible' : 'hidden',
                    zIndex: 'appBar',
                    borderRadius: 0
                }}
            >
                <Container maxWidth="xl" sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Left Side - Logo and Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/" passHref>
                                <MuiLink sx={{ display: 'block', textDecoration: 'none', color: 'text.primary' }}>
                                    <Typography variant="h6" component="h1">
                                        {content.companyName}
                                    </Typography>
                                </MuiLink>
                            </Link>

                            {/* Desktop Menu - Hidden on mobile */}
                            {!isMobile && (
                                <Stack direction="row" spacing={2} sx={{ ml: 4 }}>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { color: 'primary.main' } }}
                                    >
                                        {content.navItems.features}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { color: 'primary.main' } }}
                                    >
                                        {content.navItems.testimonials}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{ '&:hover': { color: 'primary.main' } }}
                                    >
                                        {content.navItems.pricing}
                                    </Button>
                                </Stack>
                            )}
                        </Box>

                        {/* Right Side - Contact and CTA */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Language toggle button */}
                            <Button
                                variant="text"
                                size="small"
                                onClick={toggleLanguage}
                                color="inherit"
                                sx={{
                                    '&:hover': { color: 'primary.main' },
                                    mr: 1
                                }}
                            >
                                {language === 'en' ? (
                                    <span>{content.languageToggle.en} | <span style={{ opacity: 0.5 }}>{content.languageToggle.es}</span></span>
                                ) : (
                                    <span><span style={{ opacity: 0.5 }}>{content.languageToggle.en}</span> | {content.languageToggle.es}</span>
                                )}
                            </Button>

                            {/* Contact Info - Hidden on mobile */}
                            {!isMedium && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: 'secondary.main',
                                            width: 28,
                                            height: 28
                                        }}
                                    >
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                            Need help?
                                        </Typography>
                                        <MuiLink
                                            href="tel:+1234567890"
                                            sx={{
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                color: 'text.primary',
                                                textDecoration: 'none',
                                                display: 'block',
                                                '&:hover': { color: 'primary.main' }
                                            }}
                                        >
                                            (123) 456-7890
                                        </MuiLink>
                                    </Box>
                                </Box>
                            )}

                            {/* CTA Button */}
                            {!isSmall && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    sx={{
                                        ml: { xs: 0, md: 3 },
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}
                                >
                                    Get Started
                                </Button>
                            )}

                            {/* Mobile Menu Toggle */}
                            {isMobile && (
                                <IconButton
                                    aria-label="Open menu"
                                    color="inherit"
                                    onClick={toggleMobileMenu}
                                    sx={{ ml: { xs: 0, sm: 2 } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Paper>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={toggleMobileMenu}
                handleSidebar={handleSidebar}
            />
        </Box>
    );
};

export default Header;