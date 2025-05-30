'use client';
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion(Box);

export function Faq() {
  const faqs = [
    {
      question: 'How long does it typically take to develop a web application?',
      answer:
        "Development timelines vary based on project complexity. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements.",
    },
    {
      question: 'Do you provide ongoing support after the application is launched?',
      answer:
        'Yes, we offer various support and maintenance packages to ensure your application continues to run smoothly after launch. Our support includes bug fixes, security updates, performance optimization, and feature enhancements.',
    },
    {
      question: 'What technologies do you use for development?',
      answer:
        "We use modern, industry-standard technologies that ensure your application is fast, secure, and scalable. Our tech stack typically includes React, Node.js, Python, and various cloud services. We'll recommend the best technologies based on your specific project needs.",
    },
    {
      question: 'Can you help with migrating an existing application?',
      answer:
        'Absolutely. We have extensive experience migrating applications from legacy systems to modern platforms. Our process includes a thorough assessment of your current system, data migration planning, and a phased implementation approach to minimize disruption.',
    },
    {
      question: 'How do you handle project changes or new requirements?',
      answer:
        "We follow an agile development methodology that accommodates changes throughout the project lifecycle. If new requirements arise, we'll evaluate the impact on timeline and budget, then work with you to prioritize features and make necessary adjustments.",
    },
    {
      question: 'What makes your development approach different?',
      answer:
        "Our approach combines technical expertise with business understanding. We don't just build what you ask for—we collaborate with you to understand your business goals and user needs, then recommend solutions that deliver real value. We also emphasize clear communication, transparent pricing, and quality code.",
    },
  ];

  return (
    <Box component="section" sx={{ py: 12, width: '100%' }} id="faq">
      <Container maxWidth="lg" sx={{ px: 2, maxWidth: '64rem' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.875rem', md: '2.25rem' },
            }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              maxWidth: '42rem',
              mx: 'auto',
            }}
          >
            Find answers to common questions about our services, process, and technology.
          </Typography>
        </Box>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: 0,
                  mb: 2,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 3,
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3 }}>
                <Typography sx={{ color: 'text.secondary' }}>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </MotionBox>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}>
            Still have questions?{' '}
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Contact our team
            </Box>{' '}
            for more information.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
