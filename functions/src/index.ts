import { runWith } from 'firebase-functions'

import { Link } from './models'
import _step1Cronjob from './steps/step1_cronjob'
import _step2CrawlSite from './steps/step2_crawl_site'
import _step3CrawlArticle from './steps/step3_crawl_article'
import _step4ExportBody from './steps/step4_export_body'
import apiArticles from './api/articles'
import apiStatistics from './api/statistics'

const region = 'asia-east2'
const crawler = runWith({
  maxInstances: 3,
  timeoutSeconds: 540
}).region(region)

export const step1Cronjob = crawler.pubsub.schedule('every 5 minutes').onRun(async (_) => {
  await _step1Cronjob()
})

export const stepCrawlLink = crawler.firestore.document('links/{linkId}').onWrite(async (change, _) => {
  if (change?.after?.exists) {
    const link = change.after.data() as Link
    switch (link.type) {
      case 'site':
        await _step2CrawlSite(link.url)
        break
      case 'article':
        await _step3CrawlArticle(link.url)
        break
    }
  } else {
    console.log(JSON.stringify(change))
  }
})

export const step4ExportBody = crawler.pubsub.schedule('every 480 minutes').onRun(async (_) => {
  await _step4ExportBody('vietnamese-news-exports')
})

const api = runWith({
  timeoutSeconds: 30
}).region(region)

export const articles = api.https.onRequest(apiArticles)

export const statistics = api.https.onRequest(apiStatistics)
