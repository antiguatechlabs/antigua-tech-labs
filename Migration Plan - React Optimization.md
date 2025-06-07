# Migration Plan: Modular Content Loading with Grouped Props

## Background

The current multilingual architecture uses modular JSON files per section (e.g., hero.json, footer.json), and components dynamically load their content using `useLanguage`, `useParams`, and `useState`. This leads to duplicated logic, potential performance drawbacks, and animation side effects when changing language.

## Goal

Refactor the `page.tsx` file and components to use grouped, static content props. Each component will receive its localized content from `page.tsx`, which will use a central loader utility to organize data for the entire page. This improves performance, eliminates unnecessary state management, and prevents unwanted re-renders and animation resets.

## Migration Plan

### 1. Create a Page Content Loader

Create a new file `lib/pageContent.ts`:

```ts
import {
  getNavbarContent,
  getHeroContent,
  getWhyChooseTwoContent,
  getSliderContent,
  getFeaturesContent,
  getWhyChooseContent,
  getContactContent,
  getFAQContent,
  getFooterContent,
} from './data';

export function getHomePageContent(lang: string) {
  return {
    navbar: getNavbarContent(lang),
    hero: getHeroContent(lang),
    whyChooseTwo: getWhyChooseTwoContent(lang),
    slider: getSliderContent(lang),
    features: getFeaturesContent(lang),
    whyChoose: getWhyChooseContent(lang),
    contact: getContactContent(lang),
    faq: getFAQContent(lang),
    footer: getFooterContent(lang),
  };
}
```

### 2. Update `page.tsx`

Update `app/[lang]/page.tsx`:

```tsx
import { getHomePageContent } from '@/lib/pageContent';
import {
  Navbar,
  Hero,
  WhyChooseTwo,
  Slider,
  Features,
  WhyChoose,
  Contact,
  FAQ,
  Footer,
} from '@/components';

export default function Home({ params }: { params: { lang: string } }) {
  const content = getHomePageContent(params.lang);

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
```

### 3. Refactor Components to Accept Props

Each component should remove the logic using `useParams`, `useLanguage`, `useState`, and `useEffect`, and instead receive `content` as a prop.

Example for `Hero.tsx`:

```tsx
import { HeroContent } from '@/lib/data';

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section>
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
      <button>{content.cta}</button>
    </section>
  );
}
```

Repeat this for all components (`Navbar`, `Features`, etc.), using the proper interface for each one.

### 4. Delete Old State Logic from Components

Remove all these patterns from components:
- `const { language } = useLanguage();`
- `const params = useParams();`
- `const [content, setContent] = useState(...)`
- `useEffect(() => { ... }, [language])`

Use only the `content` prop passed from `page.tsx`.

### 5. Optional: Add Static Validation (Types)

If you want, create a central type:

```ts
export interface HomePageContent {
  navbar: NavbarContent;
  hero: HeroContent;
  whyChooseTwo: WhyChooseTwoContent;
  slider: SliderContent;
  features: FeaturesContent;
  whyChoose: WhyChooseContent;
  contact: ContactContent;
  faq: FAQContent;
  footer: FooterContent;
}
```

And type your `getHomePageContent` and `content` accordingly:

```ts
export function getHomePageContent(lang: string): HomePageContent { ... }
```

## Benefits

- ⚡ Improved page performance
- 🧼 Cleaner component code with no client-side language switching
- 🎯 Server-side rendering ready
- 🎬 Framer Motion animations stay stable across language changes
- 🧪 Better testability (props are predictable)

## Next Steps

1. Create `lib/pageContent.ts`
2. Update `page.tsx` to use `getHomePageContent()`
3. Refactor each component to receive typed `content` prop
4. Delete old logic from inside components
5. Test switching language and verify content + animations
6. Commit in small pieces to allow easy rollback if needed
