import { pubsub } from '../services'

const sites = [
  'https://dantri.com.vn',
  'https://tuoitre.vn',
  'https://vietnamnet.vn',
  'https://vnexpress.net'
]

const cronjob = async (): Promise<void> => {
  for (const site of sites) {
    await pubsub.crawlSite(site)
  }
}

export default cronjob
