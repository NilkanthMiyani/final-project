import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';

/** Body copy and UI. */
export const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

/** Dates, metrics, tech names, section numbering — anything tabular or technical. */
export const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/** Large editorial headings. One weight, used big and sparingly. */
export const fontDisplay = Instrument_Serif({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});
