import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import HeroImage from '@/assets/hero/code.svg'; // Asegúrate de colocar esta imagen en /public

export const Remove = () => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
      perspective: 1000,
    }}
  >
    {/* Tab Header */}
    <Box
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: 'white',
        border: '1px solid #444',
        transform: 'rotateX(0deg) translateZ(0px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Box sx={{ px: 2, py: 1, borderBottom: '1px solid #444' }}>
        <Typography
          variant="subtitle2"
          sx={{ color: '#444', display: 'flex', alignItems: 'center' }}
        >
          <Box component="span" sx={{ mr: 1 }}>
            {'</>'}
          </Box>
            Reliable
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        //   border: '1px solid red',
        //   p: 2,
        }}
      >
        <Image
          src={HeroImage}
          alt="Stacked UI"
          width={300}
          height={300}
          style={{
            filter: 'drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1))',
            width: '100%',
            height: 'auto',
            paddingTop: 1,
            paddingBottom: 1,
            zIndex: 9999,
          }}
          priority
        />
      </Box>
    </Box>
  </Box>
);
