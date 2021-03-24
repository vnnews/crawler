import { firestore } from '../services'

const sites = [
  'https://dantri.com.vn',
  'https://tuoitre.vn',
  'https://vietnamnet.vn',
  'https://vnexpress.net'
]

const cronjob = async (): Promise<void> => {
  for (const site of sites) {
    await firestore.setLink({ type: 'site', url: site })
  }
}

export default cronjob
