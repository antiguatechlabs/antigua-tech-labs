'use client';

import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Create motion components using the recommended motion() syntax
// This is more compatible with React 18 and Next.js
export const MotionBox = motion(Box);
export const MotionContainer = motion(Container);
export const MotionStack = motion(Stack);
export const MotionPaper = motion(Paper);
export const MotionButton = motion(Button);
export const MotionTypography = motion(Typography);

// Export all components for easy imports
