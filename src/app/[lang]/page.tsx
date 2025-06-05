import {
  Footer,
  WhyChoose,
  WhyChooseTwo,
  Slider,
  Navbar,
  Contact,
  FAQ,
  Hero,
  Features,
} from '@/components';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyChooseTwo />
      <Slider />
      <Features />
      <WhyChoose />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
