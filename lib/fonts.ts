import { Geist } from 'next/font/google';

/**
 * One typeface for the whole site. A minimal design has no second voice to
 * assign — size, weight and colour carry every distinction instead.
 */
export const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});
