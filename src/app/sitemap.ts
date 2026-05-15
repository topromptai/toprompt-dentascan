import type { MetadataRoute } from 'next';

/**
 * Sitemap generator — Next.js App Router serves this at /sitemap.xml.
 *
 * Returns every static route + (later) dynamic entity routes read from the
 * database. For v1 we emit the curated static list below. To add dynamic
 * routes per entity (e.g. /blog/[slug]), extend this file with a query
 * against the relevant Mongoose model.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const now = new Date();
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return (Array.isArray(staticRoutes) ? staticRoutes : []).map((r) => ({
    url: base + r.path,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
