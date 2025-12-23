import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';

const SITE_URL = 'https://snap-tour.vercel.app';

const staticPages = ['', '/login', '/signup', '/dashboard', '/tours'];

export const getServerSideProps = async (ctx) => {
  const fields = staticPages.map((page) => ({
    loc: `${SITE_URL}${page}`,
    lastmod: new Date().toISOString(),
    changefreq: page === '' ? 'weekly' : 'monthly',
    priority: page === '' ? 1.0 : 0.8,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
