"use client";

import {
    Box,
    Stack,
    Button,
    Popover,
    Paper,
    Link as MuiLink
} from "@mui/material";
import Link from "next/link";
import { useLanguage } from "@/context/languageContext";
import { getNavbarContent } from "@/lib/data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";

interface MenuItem {
    label: string;
    href: string;
    children?: MenuItem[];
}

const Menu = () => {
    const { language } = useLanguage();
    const content = getNavbarContent(language);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setAnchorEl(event.currentTarget);
        setOpenPopoverIndex(index);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpenPopoverIndex(null);
    };

    // Define menu items
    const menuItems: MenuItem[] = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: content.navItems.features,
            href: "/#features",
        },
        {
            label: content.navItems.testimonials,
            href: "/#testimonials",
        },
        {
            label: content.navItems.pricing,
            href: "/#pricing",
        },
        {
            label: "Services",
            href: "#",
            children: [
                {
                    label: "Modern Web Applications",
                    href: "/services/web-applications",
                },
                {
                    label: "API Development",
                    href: "/services/api-development",
                },
                {
                    label: "Code Maintenance",
                    href: "/services/code-maintenance",
                },
                {
                    label: "UX Design",
                    href: "/services/ux-design",
                },
            ],
        },
        {
            label: content.navItems.contact,
            href: "/#contact",
        },
    ];

    return (
        <Stack direction="row" spacing={4} alignItems="center">
            {menuItems.map((item, index) => (
                <Box key={index}>
                    {item.children ? (
                        <>
                            <Button
                                aria-owns={openPopoverIndex === index ? `menu-popover-${index}` : undefined}
                                aria-haspopup="true"
                                onClick={(e) => handlePopoverOpen(e, index)}
                                variant="text"
                                sx={{
                                    p: 1,
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'inherit',
                                    '&:hover': {
                                        color: 'secondary.main',
                                        backgroundColor: 'transparent'
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                            >
                                {item.label}
                            </Button>
                            <Popover
                                id={`menu-popover-${index}`}
                                open={openPopoverIndex === index}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                sx={{ mt: 1 }}
                            >
                                <Paper sx={{ p: 1, minWidth: 180 }}>
                                    <Stack>
                                        {item.children.map((child, childIndex) => (
                                            <Link key={childIndex} href={child.href} passHref>
                                                <MuiLink
                                                    underline="none"
                                                    onClick={handlePopoverClose}
                                                    sx={{
                                                        px: 2,
                                                        py: 1,
                                                        display: 'block',
                                                        color: 'text.primary',
                                                        borderRadius: 1,
                                                        '&:hover': {
                                                            bgcolor: 'action.hover',
                                                            color: 'secondary.main',
                                                        }
                                                    }}
                                                >
                                                    {child.label}
                                                </MuiLink>
                                            </Link>
                                        ))}
                                    </Stack>
                                </Paper>
                            </Popover>
                        </>
                    ) : (
                        <Button
                            component={Link}
                            href={item.href}
                            variant="text"
                            sx={{
                                p: 1,
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: 'inherit',
                                '&:hover': {
                                    color: 'secondary.main',
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            {item.label}
                        </Button>
                    )}
                </Box>
            ))}
        </Stack>
    );
};

export default Menu;