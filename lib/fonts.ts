import { Geist, Geist_Mono } from 'next/font/google';

/** UI and headings. Used tight and heavy at display sizes. */
export const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

/** Labels, dates, metrics, tech names. */
export const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});
