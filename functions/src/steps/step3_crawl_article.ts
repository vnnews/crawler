import axios from 'axios'
import * as cheerio from 'cheerio'

import extract from '../extract'
import { isBlacklisted } from '../knowledge'
import { firestore, logger } from '../services'

const crawlArticle = async (url: string): Promise<void> => {
  if (isBlacklisted(url)) {
    logger.warn('crawlArticle skipped blacklisted URL', { url })
    return
  } else {
    logger.log('crawlArticle starting...', { url })
  }

  const response = await axios.get<string>(url, {
    responseType: 'text'
  })
  const $ = cheerio.load(response.data)

  const metadata: { [key: string]: string } = {}
  $('meta').each(function (_, e) {
    const property = e.attribs.property
    if (typeof property !== 'string') return
    if (!property.startsWith('og:')) return

    const content = e.attribs.content
    if (typeof content !== 'string') return

    metadata[property] = content
  })

  const ogUrl = metadata['og:url'] ?? url
  const extracted = extract(ogUrl, response.data)
  const hasMetadata = Object.keys(metadata).length > 0
  const hasExtracted = extracted !== null

  const logPayload: any = {
    article_url: url,
    has_metadata: hasMetadata,
    has_extracted: hasExtracted,
    og_url: ogUrl
  }

  if (hasExtracted) {
    logPayload.extracted = {
      body_length: extracted?.body?.length ?? 0,
      tags_length: extracted?.tags?.length ?? 0
    }

    const article = {
      url: ogUrl,
      metadata,
      body: extracted?.body ?? '',
      tags: extracted?.tags
    }

    const existingArticle = await firestore.getArticleByUrl(article.url)
    const isNew = typeof existingArticle === 'undefined'

    if (isNew) {
      await firestore.createArticle(article)
      logPayload.create_article = true
    } else {
      await firestore.setArticle(article)
      logPayload.set_article = true
    }

    logger.log('crawlArticle OK', logPayload)
  } else {
    logger.error('crawlArticle failed', logPayload)
  }
}

export default crawlArticle

if (require.main === module) {
  const url = process.argv[2]
  logger.log({ url })
  crawlArticle(url).then((_) => { }, (e) => console.error(e))
}
