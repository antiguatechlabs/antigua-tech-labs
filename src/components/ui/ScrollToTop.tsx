'use client';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fab, useScrollTrigger, Zoom, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ScrollToTop component props
 *
 * @param threshold - Scroll distance in pixels before showing the button (default: 100)
 * @param position - Position of the button (bottom, right)
 * @param sx - Additional Material UI sx props, supports responsive values
 */
interface ScrollToTopProps {
  threshold?: number;
  position?: {
    bottom?: number | string;
    right?: number | string;
  };
  sx?: SxProps<Theme>; // Fully supports responsive values like { xs: 8, md: 10, lg: 30 }
}

export default function ScrollToTop({
  threshold = 100,
  position = { bottom: 20, right: 20 },
  sx,
}: ScrollToTopProps) {
  // Use scroll trigger to determine when to show the button
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });

  // State to track if we're in a browser environment
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClick = () => {
    if (!isBrowser) return;

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Define animation variants
  const fabVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.1,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeIn',
      },
    },
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        position: 'fixed',
        bottom: position.bottom,
        right: position.right,
        zIndex: 1000,
        ...sx,
      }}
    >
      <Zoom in={trigger}>
        <Box
          component={motion.div}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          variants={fabVariants}
        >
          <Fab
            onClick={handleClick}
            size="medium"
            aria-label="scroll back to top"
            sx={{
              bgcolor: 'background.default',
              color: 'var(--button-text)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Zoom>
    </Box>
  );
}
