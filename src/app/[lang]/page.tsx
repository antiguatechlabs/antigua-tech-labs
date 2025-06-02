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
      <WhyChoose />
      <WhyChooseTwo />
      <Features />
      <Slider />
      <Contact />
      <FAQ />
      <Footer />
    </>
  );
}
