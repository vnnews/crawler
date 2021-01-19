import { PubSub } from '@google-cloud/pubsub'

import { isProduction } from './firebase'

const _publish = async (topicName: string, url: string): Promise<void> => {
  if (isProduction) {
    const pubsub = new PubSub()
    const topic = pubsub.topic(topicName)
    await topic.publishJSON({ url })
  } else {
    console.log('pubsub._publish(%s, %s)', topicName, url)
  }
}

export default {
  crawlSite: async (url: string) => await _publish('crawler.crawl_site', url),
  crawlArticle: async (url: string) => await _publish('crawler.crawl_article', url)
}
