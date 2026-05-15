import type { MetadataRoute } from 'next';

/**
 * robots.txt generator — Next.js App Router serves this at /robots.txt.
 * Disallows crawler access to private surface areas (/admin, /api, /dashboard)
 * and points crawlers at the sitemap for efficient discovery.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard'],
      },
    ],
    sitemap: base + '/sitemap.xml',
    host: base,
  };
}
