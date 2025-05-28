"use client";

import {
    Box,
    Container,
    Paper
} from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { CounterUp } from "@/components/ui";
import BrandSlider from "./BrandSlider";
import { useEffect, useState } from "react";
import { getBrandContent, BrandContent } from "@/lib/data";
import { useLanguage } from "@/context/languageContext";

// Create motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Brand = () => {
    const { language } = useLanguage();
    const [content, setContent] = useState<BrandContent>(getBrandContent(language));

    // Update content when language changes
    useEffect(() => {
        setContent(getBrandContent(language));
    }, [language]);
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