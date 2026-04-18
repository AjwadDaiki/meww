import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|fonts|textures|previews|pnj|gifs|stickers|.well-known).*)'],
};
