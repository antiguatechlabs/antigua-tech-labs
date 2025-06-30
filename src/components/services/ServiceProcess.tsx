'use client';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Box,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import React, { useState } from 'react';

import { Section } from '@/components/common';
import { fadeVariant, staggerContainerVariant } from '@/lib';
import { ServiceProcessContent, ServiceProcessStep } from '@/lib/data';
import { MotionDiv } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceProcessProps {
  content: ServiceProcessContent;
}

export function ServiceProcess({ content }: ServiceProcessProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string>('step-0');

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    setExpandedAccordion(`step-${stepIndex}`);
  };

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    if (isExpanded) {
      const stepIndex = parseInt(panel.split('-')[1]);
      setActiveStep(stepIndex);
      setExpandedAccordion(panel);
    } else {
      setExpandedAccordion('');
    }
  };

  return (
    <Section
      id="service-process"
      animation="fadeInUp"
      animationDelay={0.3}
      sx={{
        py: { xs: 6, md: 10 },
        background: 'linear-gradient(180deg, rgba(72,70,79,0.33), rgba(90,48,255,0.01))',
      }}
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
      </Box>

      <MotionDiv {...staggerContainerVariant} style={{ width: '100%' }}>
        {/* Stepper */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 6 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              '& .MuiStepConnector-line': {
                borderTopWidth: 2,
                borderColor: 'primary.main',
              },
              '& .MuiStepLabel-root': {
                cursor: 'pointer',
              },
            }}
          >
            {content.steps.map((step: ServiceProcessStep, index: number) => (
              <Step key={step.number} completed={index < activeStep}>
                <MotionDiv {...fadeVariant}>
                  <StepLabel
                    onClick={() => handleStepClick(index)}
                    sx={{
                      '.MuiStepIcon-root': {
                        color: index === activeStep ? 'primary.main' : 'grey.400',
                        border: index === activeStep ? '2px solid': 'transparent',
                        borderColor: 'primary.main',
                        borderRadius: '50%',
                        p: 0.5,
                      },
                      '.MuiStepLabel-label': {
                        fontSize: '1rem',
                        fontWeight: 600,
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {step.title}
                    </Typography>
                  </StepLabel>
                </MotionDiv>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Accordion */}
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {content.steps.map((step: ServiceProcessStep, index: number) => {
            const panelId = `step-${index}`;
            const isExpanded = expandedAccordion === panelId;

            return (
              <MotionDiv key={step.number} {...fadeVariant}>
                <Accordion
                  expanded={isExpanded}
                  onChange={handleAccordionChange(panelId)}
                  sx={{
                    mb: 2,
                    borderRadius: '1.5rem',
                    background: 'rgba(255,255,255,0.8)',
                    borderLeft: isExpanded ? '4px solid' : '1px solid',
                    borderColor: isExpanded ? 'primary.main' : 'divider',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ArrowForwardIosRoundedIcon fontSize="small" />}
                    sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center' } }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3,
                        flexShrink: 0,
                        background: 'linear-gradient(to right, #9c43f8, #26c5f3)',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {step.number}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {textWithGradient(step.title)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pl: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        maxWidth: '65ch',
                      }}
                    >
                      {step.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </MotionDiv>
            );
          })}
        </Box>
      </MotionDiv>
    </Section>
  );
}

