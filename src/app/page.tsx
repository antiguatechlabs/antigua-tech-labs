'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import {
  Header,
  Footer,
  Sidebar,
  WhyChoose,
  WhyChooseTwo,
  BrandSlider,
  // Hero,
  // Features,
  Contact,
} from '@/components';
import { getBrandSliderContent } from '@/lib/data';
import { useLanguage } from '@/context/languageContext';
import { Faq } from '../../components-to-migrate/faq';
import { Hero } from '../../components-to-migrate/hero';
// import { NavbarComponent } from '../../components-to-migrate/navbar';
import { Features } from '../../components-to-migrate/features';
import LegacyHeader from '../../legacy-components/Header';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const [brandSliderTitle, setBrandSliderTitle] = useState('Our Trusted Partners');

  useEffect(() => {
    const content = getBrandSliderContent(language);
    setBrandSliderTitle(content.title);
  }, [language]);

  return (
    <>
      {/* <Header handleSidebar={handleSidebar} /> */}
      {/* <NavbarComponent /> */}
      <LegacyHeader handleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Header />
      <Hero />
      {/* test */}
      <Faq />

      {/* end test */}
      <WhyChoose />
      <WhyChooseTwo />
      <Features />
      {/* <Brand /> */}
      <Box component="section" sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 5,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            {brandSliderTitle}
          </Typography>
          <BrandSlider />
        </Container>
      </Box>
      <Contact />
      <Footer />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
