import { ImageResponse } from 'next/og';

/**
 * Default Open Graph image (1200x630) served at /opengraph-image.
 * Next.js auto-generates the <meta property="og:image"> tag pointing here.
 * Individual pages can override by exporting their own opengraph-image
 * file or by setting metadata.openGraph.images.
 */
export const runtime = 'edge';
export const alt = 'DentaScan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: '-0.04em', textAlign: 'center', lineHeight: 1.05 }}>
          DentaScan
        </div>
        <div style={{ marginTop: 32, fontSize: 32, opacity: 0.72, textAlign: 'center', maxWidth: 900 }}>
          A car damage detection system that allows users to upload images of damaged vehicles, analyzes the images to identify damaged parts, and displays the results in an intuitive format.
        </div>
      </div>
    ),
    { ...size },
  );
}
