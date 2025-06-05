'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

import { Section } from '@/components/common';
import { useLanguage } from '@/context/languageContext';
import { getFAQContent, FAQContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

// Create motion components
const MotionBox = motion(Box);

export function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const { language } = useLanguage();
  const [content, setContent] = useState<FAQContent>(getFAQContent(language));

  useEffect(() => {
    setContent(getFAQContent(language));
  }, [language]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Section
      id="faq"
      animation="slideLeft"
      animationDelay={0.3}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.875rem', md: '2.25rem' },
          }}
        >
          {textWithGradient(content.title)}
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
          {content.subtitle}
        </Typography>
      </Box>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {content.faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            disableGutters
            elevation={0}
            sx={{
              borderTop: index === 0 ? 'none' : '1px solid',
              borderColor: 'divider',
              borderRadius: '0 !important',
              overflow: 'hidden',
              '&:before': {
                display: 'none',
              },
              '&:not(:last-child)': {
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
              sx={{
                px: 0,
                py: 3,
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: 'text.primary', fontSize: 18 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: 0,
                pt: 0,
                pb: 4,

              }}
            >
              <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </MotionBox>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography>
          {content.contactText}{' '}
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
            {content.contactLink}
          </Box>{' '}
          {content.contactSuffix}
        </Typography>
      </Box>
    </Section>
  );
}
