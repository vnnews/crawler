import axios from 'axios'
import * as cheerio from 'cheerio'
import { URL } from 'url'

import { config, isBlacklisted } from '../knowledge'
import { logger, firestore } from '../services'

const crawlSite = async (url: string): Promise<void> => {
  logger.debug('crawlSite starting...', { url })
  const response = await axios.get<string>(url, {
    responseType: 'text'
  })
  const $ = cheerio.load(response.data)

  const hrefs: string[] = []
  $('a').each(function (_, e) {
    const href = e.attribs.href
    if (typeof href !== 'string') return

    const urlObj = new URL(href.replace(/#.*$/, ''), url)
    const resolvedHref = urlObj.toString()
    if (!resolvedHref.startsWith(url)) return

    if (isBlacklisted(resolvedHref)) return

    hrefs.push(resolvedHref)
  })

  const { crawlArticleAgainAfterMillis } = config
  const hrefSet = new Set(hrefs)
  let found = 0
  let fresh = 0
  let scheduled = 0
  for (const href of hrefSet) {
    found++
    if (crawlArticleAgainAfterMillis > 0) {
      const link = await firestore.getLink(href)
      const ms = link?.last_timestamp?.toMillis()
      if (typeof ms === 'number' && ms > Date.now() - crawlArticleAgainAfterMillis) {
        fresh++
        continue
      }
    }

    await firestore.setLink({ type: 'article', url: href })
    scheduled++
  }

  const logPayload = {
    site_url: url,
    article_urls_found: found,
    article_urls_fresh: fresh,
    article_urls_scheduled: scheduled
  }
  if (found > 0) {
    logger.info('crawlSite OK', logPayload)
  } else {
    logger.error('crawlSite failed', logPayload)
  }
}

export default crawlSite

if (require.main === module) {
  const url = process.argv[2]
  logger.debug({ url })
  crawlSite(url).then((_) => { }, (e) => console.error(e))
}
