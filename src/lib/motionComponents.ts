'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';

// Create motion components using the recommended motion() syntax
// This is more compatible with React 18 and Next.js
export const MotionBox = motion.create(Box);
export const MotionContainer = motion.create(Container);
export const MotionStack = motion.create(Stack);
export const MotionPaper = motion.create(Paper);
export const MotionButton = motion.create(Button);
export const MotionTypography = motion.create(Typography);
export const MotionCard = motion.create(Card);

// For elements that don't have MUI equivalents
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionSpan = motion.span;

// Export all components for easy imports
