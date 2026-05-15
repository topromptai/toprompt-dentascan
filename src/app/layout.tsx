import type { Metadata } from 'next';
import { Orbitron, IBM_Plex_Mono, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ErrorBridge, ErrorBoundary } from '@toprompt/next-error-bridge';
import { DesignPreviewFetchShim } from '@/lib/_design-preview-fetch-shim';

const heading = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const body = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'DentaScan',
  description:
    'AI-powered car damage detection. Upload vehicle images and instantly identify damaged parts with forensic precision.',
  openGraph: {
    title: 'DentaScan',
    description:
      'AI-powered car damage detection. Upload vehicle images and instantly identify damaged parts with forensic precision.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentaScan',
    description: 'AI-powered car damage detection.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <body
        className="bg-[var(--color-background)] text-[var(--color-text)] font-body"
      >
        <DesignPreviewFetchShim />
        <ErrorBridge />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
