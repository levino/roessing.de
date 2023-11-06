export default {
  ci: {
    budget: {
      performance: 50,
      accessibility: 100,
      'best-practices': 90,
      seo: 90,
    },
  },
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
}
