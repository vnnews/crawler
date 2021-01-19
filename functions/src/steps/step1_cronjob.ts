import { pubsub } from '../services'

const sites = [
  'https://dantri.com.vn',
  'https://vnexpress.net',
  'https://vietnamnet.vn'
]

const cronjob = async (): Promise<void> => {
  for (const site of sites) {
    await pubsub.crawlSite(site)
  }
}

export default cronjob
