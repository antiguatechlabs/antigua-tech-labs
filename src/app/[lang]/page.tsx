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
import { getHomePageContent } from '@/lib/pageContent';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getHomePageContent(lang);

  return (
    <>
      <Navbar content={content.navbar} />
      <Hero content={content.hero} />
      <WhyChooseTwo content={content.whyChooseTwo} />
      <Slider content={content.slider} />
      <Features content={content.features} />
      <WhyChoose content={content.whyChoose} />
      <Contact content={content.contact} />
      <FAQ content={content.faq} />
      <Footer content={content.footer} />
    </>
  );
}
