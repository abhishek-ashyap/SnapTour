module.exports = {
  title: 'SnapTour - Create Interactive Product Demos',
  description: 'Create and share beautiful, interactive product demos in seconds with SnapTour. Perfect for user onboarding and feature showcases.',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://snap-tour.vercel.app/',
    site_name: 'SnapTour',
    images: [
      {
        url: 'https://snap-tour.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SnapTour - Interactive Product Demo Builder',
      },
    ],
  },
  twitter: {
    handle: '@yourtwitterhandle',
    site: '@yoursite',
    cardType: 'summary_large_image',
  },
  robotsProps: {
    nosnippet: false,
    notranslate: true,
    noimageindex: false,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
};
