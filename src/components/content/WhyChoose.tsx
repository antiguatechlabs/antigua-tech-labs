"use client";

import {
    Box,
    Container,
    Typography,
    Button,
    Paper
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { useEffect, useState } from "react";

// Create motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Define WhyChooseContent interface
interface WhyChooseContent {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    imageSrc: string;
    yearEstablished: string;
    tagline: string;
}

const WhyChoose = () => {
    const [whyChooseContent, setWhyChooseContent] = useState<WhyChooseContent>({
        title: "Why Choose Antigua Digital",
        subtitle: "Your Partner in Digital Transformation",
        description: "At Antigua Digital, we combine technical expertise with creative thinking to deliver solutions that drive business growth. Our team of experienced developers and designers work collaboratively to create scalable, user-friendly applications that meet your specific business needs.",
        buttonText: "Learn More",
        buttonLink: "/about",
        imageSrc: "/images/why-choose.jpg",
        yearEstablished: "2020",
        tagline: "Delivering excellence in digital solutions"
    });

    useEffect(() => {
        // Load content from JSON file
        const loadContent = async () => {
            try {
                const response = await fetch('/content/whyChoose.json');
                const data = await response.json();
                setWhyChooseContent(data);
            } catch (error) {
                console.error("Failed to load WhyChoose content:", error);
            }
        };

        loadContent();
    }, []);
    return (
        <Box component="section" sx={{ py: 10, bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 5, alignItems: 'center' }}>
                    {/* Left Content */}
                    <Box sx={{ flex: 1 }}>
                        <MotionBox
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInLeft}
                        >
                            <Typography
                                color="secondary.main"
                                fontWeight="bold"
                                variant="subtitle1"
                                sx={{
                                    mb: 1.5,
                                    textTransform: "uppercase",
                                    letterSpacing: 1
                                }}
                            >
                                {whyChooseContent.subtitle}
                            </Typography>

                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    mb: 3,
                                    fontSize: { xs: '2rem', md: '2.5rem' },
                                    color: 'text.primary'
                                }}
                            >
                                {whyChooseContent.title}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    color: 'text.secondary',
                                    fontSize: '1.125rem'
                                }}
                            >
                                {whyChooseContent.description}
                            </Typography>

                            <Box>
                                <Button
                                    component={Link}
                                    href={whyChooseContent.buttonLink}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{
                                        px: 4,
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1
                                    }}
                                >
                                    {whyChooseContent.buttonText}
                                </Button>
                            </Box>
                        </MotionBox>
                    </Box>

                    {/* Right Image */}
                    <Box sx={{ flex: 1, position: "relative" }}>
                        <MotionBox
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideInRight}
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Paper
                                elevation={4}
                                sx={{
                                    position: "relative",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    width: "100%",
                                    height: { xs: "300px", md: "400px" }
                                }}
                            >
                                <Box
                                    component="div"
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <Image
                                        src={whyChooseContent.imageSrc}
                                        alt="Why Choose Us"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </Paper>

                            {/* Floating Element */}
                            <MotionPaper
                                elevation={4}
                                sx={{
                                    position: "absolute",
                                    bottom: "-20px",
                                    right: { xs: "10%", md: "5%" },
                                    bgcolor: "secondary.main",
                                    color: "white",
                                    p: 2.5,
                                    borderRadius: 2,
                                    maxWidth: "200px"
                                }}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: 1,
                                    transition: {
                                        y: {
                                            duration: 4,
                                            repeat: Infinity,
                                            repeatType: "loop"
                                        },
                                        opacity: {
                                            duration: 0.5,
                                            delay: 0.5
                                        }
                                    }
                                }}
                            >
                                <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
                                    Since {whyChooseContent.yearEstablished}
                                </Typography>
                                <Typography variant="body2">
                                    {whyChooseContent.tagline}
                                </Typography>
                            </MotionPaper>
                        </MotionBox>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WhyChoose;