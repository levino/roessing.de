import { getViteConfig } from 'astro/config'

export default getViteConfig({
  //@ts-expect-error - astro types are wrong
  test: {
    exclude: ['./tests', 'node_modules'],
  },
})
