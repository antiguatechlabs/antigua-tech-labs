"use client";

import {
    Box,
    Drawer,
    Stack,
    Typography,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from "@/lib/languageContext";
import { getContactContent } from "@/lib/data";
import { useState } from "react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { language } = useLanguage();
    const content = getContactContent(language);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log("Form submitted:", formData);

        // Reset form
        setFormData({
            name: "",
            email: "",
            message: ""
        });

        // Close sidebar
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 400 },
                    boxSizing: 'border-box',
                    p: 3
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">{content.title}</Typography>
                <IconButton onClick={onClose} aria-label="Close sidebar">
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* About Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                    About Us
                </Typography>
                <Typography variant="body2">
                    Antigua Digital is a leading digital agency specializing in web development,
                    mobile applications, and digital marketing solutions. We help businesses
                    transform their digital presence and achieve their goals.
                </Typography>
            </Box>

            {/* Contact Form */}
            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            {content.formLabels.name}
                        </Typography>
                        <TextField
                            name="name"
                            placeholder={content.placeholders.name}
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                            variant="outlined"
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            {content.formLabels.email}
                        </Typography>
                        <TextField
                            name="email"
                            type="email"
                            placeholder={content.placeholders.email}
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            size="small"
                            variant="outlined"
                        />
                    </Box>

                    <Box>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            {content.formLabels.message}
                        </Typography>
                        <TextField
                            name="message"
                            placeholder={content.placeholders.message}
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={6}
                            variant="outlined"
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {content.buttonText}
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default Sidebar;