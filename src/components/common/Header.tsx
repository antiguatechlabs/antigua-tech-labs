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
import { useLanguage } from "@/context/languageContext";
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

    const { language } = useLanguage();
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
        <Box component="header" sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}>
            {/* Single Header that changes appearance on scroll */}
            <Paper
                elevation={isSticky ? 3 : 0}
                sx={{
                    bgcolor: isSticky ? 'background.paper' : 'secondary.main',
                    transition: 'all 0.3s ease',
                    borderRadius: 0
                }}
            >
                <Container maxWidth="xl" sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Left Side - Logo and Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/" passHref>
                                <MuiLink sx={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: isSticky ? 'text.primary' : 'white'
                                }}>
                                    <Typography variant="h6" component="h1">
                                        {content.companyName}
                                    </Typography>
                                </MuiLink>
                            </Link>

                            {/* Desktop Menu - Hidden on mobile */}
                            {!isMobile && (
                                <Stack direction="row" spacing={2} sx={{ ml: isSticky ? 4 : 5 }}>
                                    <Button
                                        color="inherit"
                                        sx={{
                                            '&:hover': isSticky
                                                ? { color: 'primary.main' }
                                                : { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                                        }}
                                    >
                                        {content.navItems.features}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{
                                            '&:hover': isSticky
                                                ? { color: 'primary.main' }
                                                : { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                                        }}
                                    >
                                        {content.navItems.testimonials}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        sx={{
                                            '&:hover': isSticky
                                                ? { color: 'primary.main' }
                                                : { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                                        }}
                                    >
                                        {content.navItems.pricing}
                                    </Button>
                                </Stack>
                            )}
                        </Box>

                        {/* Right Side - Contact and CTA */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Language toggle moved to sidebar */}

                            {/* Contact Info - Hidden on mobile */}
                            {!isMedium && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: isSticky ? 'secondary.main' : 'secondary.light',
                                            width: isSticky ? 28 : 32,
                                            height: isSticky ? 28 : 32
                                        }}
                                    >
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: isSticky ? 'text.primary' : 'white',
                                                fontWeight: 500
                                            }}
                                        >
                                            Need help?
                                        </Typography>
                                        <MuiLink
                                            href="tel:+15025557890"
                                            sx={{
                                                fontSize: isSticky ? '0.75rem' : '0.875rem',
                                                fontWeight: 700,
                                                color: isSticky ? 'text.primary' : 'white',
                                                textDecoration: 'none',
                                                display: 'block',
                                                '&:hover': {
                                                    color: isSticky ? 'primary.main' : 'secondary.light'
                                                }
                                            }}
                                        >
                                            (502) 555-7890
                                        </MuiLink>
                                    </Box>
                                </Box>
                            )}

                            {/* CTA Button */}
                            {!isSmall && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size={isSticky ? "small" : "medium"}
                                    sx={{
                                        ml: { xs: 0, md: 3 },
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}
                                >
                                    Start Your Project
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