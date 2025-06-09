/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef, useCallback } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import jsDark from '@/assets/slider/js-logo-dark.svg';
import jsColor from '@/assets/slider/js-logo.svg';
import mongodbDark from '@/assets/slider/mongodb-logo-dark.svg';
import mongodbColor from '@/assets/slider/mongodb-logo.svg';
import mysqlDark from '@/assets/slider/mysql-logo-dark.svg';
import mysqlColor from '@/assets/slider/mysql-logo.svg';
import nextjsDark from '@/assets/slider/nextjs-logo-dark.svg';
import nextjsColor from '@/assets/slider/nextjs-logo.svg';
import nodejsDark from '@/assets/slider/nodejs-logo-dark.svg';
import nodejsColor from '@/assets/slider/nodejs-logo.svg';
import reactDark from '@/assets/slider/react-logo-dark.svg';
import reactColor from '@/assets/slider/react-logo.svg';
import tailwindDark from '@/assets/slider/tailwindcss-logo-dark.svg';
import tailwindColor from '@/assets/slider/tailwindcss-logo.svg';
import tsDark from '@/assets/slider/ts-logo-dark.svg';
import tsColor from '@/assets/slider/ts-logo.svg';
import { fadeVariant } from '@/lib/animationVariants';
import { MotionBox } from '@/lib/motionComponents';

const stackData = [
  { name: 'JavaScript', darkLogo: jsDark, colorLogo: jsColor },
  { name: 'TypeScript', darkLogo: tsDark, colorLogo: tsColor },
  { name: 'React', darkLogo: reactDark, colorLogo: reactColor },
  { name: 'Next.js', darkLogo: nextjsDark, colorLogo: nextjsColor },
  { name: 'Node.js', darkLogo: nodejsDark, colorLogo: nodejsColor },
  { name: 'Tailwind CSS', darkLogo: tailwindDark, colorLogo: tailwindColor },
  { name: 'MongoDB', darkLogo: mongodbDark, colorLogo: mongodbColor },
  { name: 'MySQL', darkLogo: mysqlDark, colorLogo: mysqlColor },
];

export const StackSlider: React.FC = () => {
  const [visibleCenterIndices, setVisibleCenterIndices] = useState<number[]>([]);
  const swiperRef = useRef(null);

  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    spaceBetween: 30,
    slidesPerView: 5,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { spaceBetween: 20, slidesPerView: 1 },
      375: { spaceBetween: 20, slidesPerView: 2 },
      576: { spaceBetween: 20, slidesPerView: 3 },
      768: { spaceBetween: 30, slidesPerView: 4 },
      992: { spaceBetween: 30, slidesPerView: 5 },
    },
    onSwiper: (swiper: any) => {
      swiperRef.current = swiper;
      updateVisibleIndices(swiper);
    },
    onResize: (swiper: any) => updateVisibleIndices(swiper),
    onSlideChange: (swiper: any) => updateVisibleIndices(swiper),
  };

  const updateVisibleIndices = useCallback((swiper: any) => {
    const slidesPerView = Math.floor(swiper.params.slidesPerView as number);
    const start = swiper.realIndex;
    const totalSlides = stackData.length;
    const visibleIndices = Array.from({ length: slidesPerView }, (_, i) => (start + i) % totalSlides);

    let centerCount = 1;
    if (slidesPerView <= 2) centerCount = visibleIndices.length;
    else if (slidesPerView <= 4) centerCount = 2;
    else centerCount = 3;

    const middle = Math.floor(visibleIndices.length / 2);
    const centerIndices = visibleIndices.slice(middle - Math.floor(centerCount / 2), middle + Math.ceil(centerCount / 2));
    setVisibleCenterIndices(centerIndices);
  }, []);

  return (
    <MotionBox
      initial="hidden"
      {...fadeVariant}
      sx={{ width: '100%', overflow: 'hidden', maxWidth: '100vw' }}
    >
      <Swiper {...swiperOptions} style={{ overflow: 'hidden', width: '100%' }}>
        {stackData.map((tech, index) => {
          const showColor = visibleCenterIndices.includes(index);
          return (
            <SwiperSlide key={tech.name + index}>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100px',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '75px',
                    height: '75px',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={tech.darkLogo}
                    alt={tech.name}
                    fill
                    style={{
                      objectFit: 'contain',
                      opacity: showColor ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  <Image
                    src={tech.colorLogo}
                    alt={tech.name}
                    fill
                    style={{
                      objectFit: 'contain',
                      opacity: showColor ? 1 : 0,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </MotionBox>
  );
};
