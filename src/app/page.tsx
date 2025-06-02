import { redirect } from 'next/navigation';

import { defaultLanguage } from '@/middleware';

// Redirect to the default language
export default function Home() {
  redirect(`/${defaultLanguage}`);
}
