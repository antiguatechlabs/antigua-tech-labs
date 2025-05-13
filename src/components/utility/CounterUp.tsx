"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

interface CounterUpProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    title?: string;
    decimals?: number;
}

const CounterUp = ({
    end,
    duration = 2,
    prefix = "",
    suffix = "",
    title = "",
    decimals = 0
}: CounterUpProps) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Set up Intersection Observer to detect when counter is in view
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        // Only start counting when in view
        if (!isInView) return;

        // Animation function
        const countUp = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const currentCount = progress * end;

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(countUp);
            }
        };

        animationFrame = requestAnimationFrame(countUp);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [end, duration, isInView]);

    // Format the number with commas and decimals
    const formattedCount = count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

    return (
        <Box ref={countRef} sx={{ textAlign: "center" }}>
            <Typography
                variant="h3"
                component="h3"
                sx={{
                    fontSize: { xs: '1.875rem', md: '2.25rem' },
                    fontWeight: 'bold',
                    color: 'secondary.main',
                    mb: 1
                }}
            >
                {prefix}{formattedCount}{suffix}
            </Typography>
            {title && (
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: 'text.secondary'
                    }}
                >
                    {title}
                </Typography>
            )}
        </Box>
    );
};

export default CounterUp;