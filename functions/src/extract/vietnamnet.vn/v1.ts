import * as cheerio from 'cheerio'

import type { Extracted } from '../interfaces'

const vnVietnamnetV1 = (html: string): Extracted | null => {
  const $ = cheerio.load(html)

  const body = $('.ArticleContent').html()?.trim() ??
    $('.Magazine-Acticle').html()?.trim() ??
    ''
  if (body.length === 0) return null
  const extractor = __filename

  const $tags = $('.tagBox')
  const tags: string[] = []
  $tags.find('li > a').each((_, e) => {
    tags.push($(e).text())
  })

  return { body, extractor, tags, type: 'text' }
}

export default vnVietnamnetV1
