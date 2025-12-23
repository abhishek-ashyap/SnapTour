import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Create and share beautiful, interactive product demos in seconds with SnapTour. Perfect for user onboarding and feature showcases." />
        <meta name="keywords" content="product demo, interactive tour, user onboarding, React, TypeScript, web development" />
        <meta property="og:title" content="SnapTour - Interactive Product Demo Builder" />
        <meta property="og:description" content="Create and share beautiful, interactive product demos in seconds with SnapTour." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://snap-tour.vercel.app/" />
        <meta property="og:image" content="https://snap-tour.vercel.app/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SnapTour - Interactive Product Demo Builder" />
        <meta name="twitter:description" content="Create and share beautiful, interactive product demos in seconds." />
        <meta name="twitter:image" content="https://snap-tour.vercel.app/og-image.jpg" />
        <link rel="canonical" href="https://snap-tour.vercel.app/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
