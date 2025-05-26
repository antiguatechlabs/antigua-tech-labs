"use client";
import { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import {
  Header,
  Footer,
  Sidebar,
  WhyChoose,
  WhyChooseTwo,
  BrandSlider,
  Hero,
  Features,
  Contact
} from '@/components';
import { getBrandSliderContent } from '@/lib/data';
import { useLanguage } from '@/lib/languageContext';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useLanguage();
  const [brandSliderTitle, setBrandSliderTitle] = useState('Our Trusted Partners');

  useEffect(() => {
    const content = getBrandSliderContent(language);
    setBrandSliderTitle(content.title);
  }, [language]);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header handleSidebar={handleSidebar} />
      <Hero />
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
              textAlign: "center",
              mb: 5,
              fontSize: { xs: '1.75rem', md: '2.25rem' }
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