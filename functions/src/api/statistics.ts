import { Request, Response } from 'firebase-functions'
import { URL } from 'url'

import { firestore } from '../services'

const statistics = async (request: Request, response: Response): Promise<void> => {
  const { after, before } = request.query
  const defaultBefore = Date.now()
  const defaultAfter = defaultBefore - 7 * 86400000
  const afterMillis = (typeof after === 'string' ? parseInt(after, 10) : undefined) ?? defaultAfter
  const beforeMillis = (typeof before === 'string' ? parseInt(before, 10) : undefined) ?? defaultBefore

  const articles = await firestore.getArticles({ afterMillis, beforeMillis, fields: ['first_timestamp', 'url'] })
  const buckets: { [date: string]: { [site: string]: number } } = {}
  for (const article of articles) {
    const date = article.first_timestamp?.toDate() ?? 'N/A'
    const dmy = typeof date === 'string' ? date : `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
    if (typeof buckets[dmy] === 'undefined') {
      buckets[dmy] = {}
    }
    const dateBuckets = buckets[dmy]

    const url = new URL(article.url)
    const site = url.hostname
    if (typeof dateBuckets[site] === 'undefined') {
      dateBuckets[site] = 1
    } else {
      dateBuckets[site]++
    }
  }

  response.send({ afterMillis, beforeMillis, buckets })
}

export default statistics
