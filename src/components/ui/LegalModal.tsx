'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import { MotionBox } from '@/lib/motionComponents';

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: {
    sections: Array<{
      title: string;
      content: string[];
    }>;
    lastUpdated: string;
  };
}

export const LegalModal: React.FC<LegalModalProps> = ({
  open,
  onClose,
  title,
  content,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            opacity: 0,
            animation: 'fadeInUp 0.3s ease forwards',
            '@keyframes fadeInUp': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Last Updated */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 4,
              fontStyle: 'italic',
            }}
          >
            {content.lastUpdated}
          </Typography>

          {/* Content Sections */}
          <Box sx={{ '& > *:not(:last-child)': { mb: 4 } }}>
            {content.sections.map((section, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  {section.title}
                </Typography>
                <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
                  {section.content.map((paragraph, pIndex) => (
                    <Typography
                      key={pIndex}
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.primary',
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </MotionBox>
            ))}
          </Box>
        </MotionBox>
      </DialogContent>
    </Dialog>
  );
};
