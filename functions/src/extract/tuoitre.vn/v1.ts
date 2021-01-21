import * as cheerio from 'cheerio'

import type { Extracted } from '../interfaces'

const vnTuoitreV1 = (html: string): Extracted | null => {
  const $ = cheerio.load(html)

  const body = $('#main-detail-body').html()?.trim() ??
    $('.sp-detail-content').html()?.trim() ??
    ''
  if (body.length === 0) return null
  const extractor = __filename

  const $tags = $('.tags-container')
  const tags: string[] = []
  $tags.find('li > a').each((_, e) => {
    tags.push($(e).text())
  })

  return { body, extractor, tags }
}

export default vnTuoitreV1
