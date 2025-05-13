"use client";

import {
    Box,
    Container,
    Paper
} from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import CounterUp from "../utility/CounterUp";
import BrandSlider from "./BrandSlider";
import { useEffect, useState } from "react";

// Create motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Define BrandContent interface
interface BrandContent {
    counterValue: number;
    counterTitle: string;
    brands: { name: string; logo: string }[];
}

const Brand = () => {
    const [content, setContent] = useState<BrandContent>({
        counterValue: 150,
        counterTitle: "Successful Projects Delivered",
        brands: [
            { name: "TechCorp", logo: "/brand/brand-1-1.png" },
            { name: "InnovateLabs", logo: "/brand/brand-1-2.png" },
            { name: "DataSphere", logo: "/brand/brand-1-3.png" },
            { name: "CloudNine", logo: "/brand/brand-1-4.png" },
            { name: "WebFusion", logo: "/brand/brand-1-5.png" }
        ]
    });

    useEffect(() => {
        // Load content from JSON file
        const loadContent = async () => {
            try {
                const response = await fetch('/content/brand.json');
                const data = await response.json();
                setContent(data);
            } catch (error) {
                console.error("Failed to load Brand content:", error);
            }
        };

        loadContent();
    }, []);
    return (
        <Box
            component="section"
            sx={{
                py: 8,
                bgcolor: 'grey.50'
            }}
        >
            <Container maxWidth="xl">
                <Box
                    component={motion.div}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                        gap: 4,
                        alignItems: 'center'
                    }}
                >
                    {/* Counter Section */}
                    <Box>
                        <MotionPaper
                            variants={fadeIn}
                            elevation={2}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                bgcolor: 'background.paper'
                            }}
                        >
                            <CounterUp
                                end={content.counterValue}
                                title={content.counterTitle}
                                suffix="+"
                            />
                        </MotionPaper>
                    </Box>

                    {/* Brand Slider */}
                    <Box>
                        <MotionBox variants={fadeIn}>
                            <BrandSlider brands={content.brands} />
                        </MotionBox>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Brand;