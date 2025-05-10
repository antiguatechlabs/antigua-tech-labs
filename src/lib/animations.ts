import { Variants } from 'framer-motion';

// Basic fade in animation
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

// Slide up and fade in animation
export const slideUp: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

// Slide in from left animation
export const slideInLeft: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

// Slide in from right animation
export const slideInRight: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

// Container for staggered children animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// Scale animation for hover effects
export const scaleOnHover: Variants = {
    initial: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
            ease: 'easeInOut'
        }
    }
};

// Button hover animation
export const buttonHover: Variants = {
    initial: { scale: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
    hover: {
        scale: 1.05,
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    },
    tap: {
        scale: 0.98,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: {
            duration: 0.1,
            ease: 'easeInOut'
        }
    }
};

// Card hover animation
export const cardHover: Variants = {
    initial: { y: 0, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
    hover: {
        y: -5,
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
};

// Pulse animation for attention
export const pulse: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop'
        }
    }
};

// Utility function to respect reduced motion preferences
export const withReducedMotion = (variants: Variants): Variants => {
    const reducedVariants: Variants = {};

    // For each animation state, create a reduced motion version
    Object.keys(variants).forEach(key => {
        reducedVariants[key] = {
            ...variants[key],
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.1
            }
        };
    });

    return reducedVariants;
};