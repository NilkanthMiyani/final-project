import { Geist, JetBrains_Mono } from 'next/font/google';

/**
 * Mono is the primary voice of this design: headings, labels, navigation,
 * metrics and every structural element are set in it.
 */
export const fontMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Sans is reserved for running prose — bios, project overviews, form copy.
 * Long paragraphs in mono are a readability tax recruiters shouldn't pay.
 * Exposed as `--font-prose` so it can never be confused with the UI font.
 */
export const fontProse = Geist({
  variable: '--font-prose',
  subsets: ['latin'],
  display: 'swap',
});
