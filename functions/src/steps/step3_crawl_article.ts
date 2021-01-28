import axios from 'axios'
import * as cheerio from 'cheerio'

import extract from '../extract'
import { isBlacklisted } from '../knowledge'
import { Article } from '../models'
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
      tags_length: extracted?.tags?.length ?? 0,
      type: extracted?.type
    }

    const article: Article = {
      url: ogUrl,
      metadata,
      body: extracted?.body ?? '',
      tags: extracted?.tags,
      type: extracted!.type
    }

    const existingArticle = await firestore.getArticleByUrl(article.url)
    if (typeof existingArticle === 'undefined') {
      await firestore.createArticle(article)
      logger.log('createArticle OK', logPayload)
    } else {
      const hasHistory = article.body !== existingArticle.body
      if (hasHistory) {
        article.has_history = true
      }

      await firestore.setArticle(article)

      if (hasHistory) {
        await firestore.createArticleHistory(existingArticle)
        logger.log('createArticleHistory OK', logPayload)
      } else {
        logger.log('setArticle OK', logPayload)
      }
    }
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
