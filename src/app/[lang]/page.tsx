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
  FramerWrapper,
} from '@/components';
import { MotionBox } from '@/lib/motionComponents';
import { getHomePageContent } from '@/lib/pageContent';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getHomePageContent(lang);

  return (
    <FramerWrapper>
      <MotionBox
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <Navbar content={content.navbar} />
        <Hero content={content.hero} />
        <WhyChooseTwo content={content.whyChooseTwo} />
        <Slider content={content.slider} />
        <Features content={content.features} />
        <WhyChoose content={content.whyChoose} />
        <Contact content={content.contact} />
        <FAQ content={content.faq} />
        <Footer content={content.footer} />
      </MotionBox>
    </FramerWrapper>
  );
}
