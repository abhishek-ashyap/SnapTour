import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

const SITE_URL = 'https://snap-tour.vercel.app';

// Add all your routes here
const staticPages = [
  '',
  '/login',
  '/signup',
  '/dashboard',
  '/tours',
  '/about',
  '/contact',
  '/privacy',
  '/terms'
];

export const getServerSideProps = async (ctx) => {
  // You can fetch dynamic routes here if needed
  // const dynamicPosts = await fetch('your-api-endpoint').then(res => res.json());
  
  const fields = [
    // Static pages
    ...staticPages.map((page) => ({
      loc: `${SITE_URL}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    })),
    
    // Add dynamic routes here
    // ...dynamicPosts.map(post => ({
    //   loc: `${SITE_URL}/posts/${post.slug}`,
    //   lastmod: new Date(post.updatedAt).toISOString(),
    //   changefreq: 'weekly',
    //   priority: 0.7,
    // }))
  ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
