import { runWith } from 'firebase-functions'

import _step1Cronjob from './steps/step1_cronjob'
import _step2CrawlSite from './steps/step2_crawl_site'
import _step3CrawlArticle from './steps/step3_crawl_article'
import _step4ExportBody from './steps/step4_export_body'

const runtimeOptions = { timeoutSeconds: 540 }
const base = runWith(runtimeOptions).region('asia-east2')
const pubsub = base.pubsub

export const step1Cronjob = pubsub.schedule('every 5 minutes').onRun(async (_) => {
  await _step1Cronjob()
})

export const step2CrawlSite = pubsub.topic('crawler.crawl_site').onPublish(async (message, _) => {
  const url = message.attributes.debug_url ?? message.json.url
  await _step2CrawlSite(url)
})

export const step3CrawlArticle = pubsub.topic('crawler.crawl_article').onPublish(async (message, _) => {
  const url = message.attributes.debug_url ?? message.json.url
  await _step3CrawlArticle(url)
})

export const step4ExportBody = pubsub.schedule('every 28800 minutes').onRun(async (_) => {
  await _step4ExportBody('vietnamese-news-exports')
})
