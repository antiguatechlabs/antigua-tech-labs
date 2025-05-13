"use client";
import Hero from './components/Hero';
import Features from './components/Features';
import Contact from './components/Contact';
import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import {
  Header,
  Footer,
  Sidebar,
  WhyChoose,
  WhyChooseTwo,
  Brand,
  BrandSlider
} from '@/components';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header handleSidebar={handleSidebar} />
      <Hero />
      <Features />
      <WhyChoose />
      <WhyChooseTwo />
      <Brand />

      {/* Standalone BrandSlider Section */}
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
            Our Trusted Partners
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