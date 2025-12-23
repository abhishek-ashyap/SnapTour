/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://snap-tour.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://snap-tour.vercel.app/sitemap.xml',
    ],
  },
  exclude: ['/server-sitemap.xml', '/admin/*'],
  outDir: 'public',
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  autoLastmod: true,
};
