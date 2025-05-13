"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import Image from "next/image";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Create motion components
const MotionBox = motion(Box);

// Define BrandSliderContent interface
interface BrandSliderContent {
    title: string;
    brands: { name: string; logo: string }[];
}

interface BrandSliderProps {
    brands?: { name: string; logo: string }[];
}

const BrandSlider = ({
    brands
}: BrandSliderProps) => {
    const [content, setContent] = useState<BrandSliderContent>({
        title: "Our Trusted Partners",
        brands: [
            { name: "TechCorp", logo: "/brand/brand-1-1.png" },
            { name: "InnovateLabs", logo: "/brand/brand-1-2.png" },
            { name: "DataSphere", logo: "/brand/brand-1-3.png" },
            { name: "CloudNine", logo: "/brand/brand-1-4.png" },
            { name: "WebFusion", logo: "/brand/brand-1-5.png" }
        ]
    });

    useEffect(() => {
        // Load content from JSON file if no props are provided
        if (!brands) {
            const loadContent = async () => {
                try {
                    const response = await fetch('/content/brandSlider.json');
                    const data = await response.json();
                    setContent(data);
                } catch (error) {
                    console.error("Failed to load BrandSlider content:", error);
                }
            };

            loadContent();
        }
    }, [brands]);

    // Use props if provided, otherwise use content from JSON
    const displayBrands = brands || content.brands;
    // Duplicate brands for infinite loop effect
    const extendedBrands = [...displayBrands, ...displayBrands];

    const swiperOptions = {
        modules: [Autoplay, Navigation, Pagination],
        spaceBetween: 30,
        slidesPerView: 5,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 1
            },
            375: {
                spaceBetween: 20,
                slidesPerView: 2
            },
            576: {
                spaceBetween: 20,
                slidesPerView: 3
            },
            768: {
                spaceBetween: 30,
                slidesPerView: 4
            },
            992: {
                spaceBetween: 30,
                slidesPerView: 5
            }
        }
    };

    return (
        <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            sx={{
                width: "100%",
                overflow: "hidden",
                maxWidth: "100vw"
            }}
        >
            <Swiper
                {...swiperOptions}
                style={{ overflow: "hidden", width: "100%" }}
            >
                {extendedBrands.map((brand, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100px"
                            }}
                        >
                            <Box sx={{ position: 'relative', width: '150px', height: '60px' }}>
                                <Box
                                    component="div"
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0.7,
                                        transition: 'opacity 0.3s ease',
                                        '&:hover': {
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        style={{
                                            objectFit: 'contain',
                                            maxHeight: '60px',
                                            maxWidth: '80%'
                                        }}
                                        onError={(e) => {
                                            // Replace broken image with brand name
                                            const target = e.target as HTMLImageElement;
                                            const parent = target.parentNode as HTMLElement;
                                            if (parent) {
                                                parent.innerHTML = `<div style="width:150px;height:60px;background:#f1f1f1;display:flex;align-items:center;justify-content:center">${brand.name}</div>`;
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MotionBox>
    );
};

export default BrandSlider;