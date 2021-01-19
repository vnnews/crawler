import * as cheerio from 'cheerio'

import type { Extracted } from '../interfaces'

const vnComDantriV1 = (html: string): Extracted | null => {
  const $ = cheerio.load(html)

  const $body = $('.dt-news__body')
  const sapoClass = 'dt-news__sapo'
  const sapo = $body.find(`.${sapoClass}`).html()?.trim() ?? ''
  const contentClass = 'dt-news__content'
  const content = $body.find(`.${contentClass}`).html()?.trim() ?? ''
  if (content.length === 0) return null

  const body = (sapo.length > 0 ? `<div class="${sapoClass}">${sapo}</div>\n\n` : '') + `<div class="${contentClass}">${content}</div>`
  const extractor = __filename

  const $tags = $('.dt-news__tags')
  const tags: string[] = []
  $tags.find('.dt-news__tag > a').each((_, e) => {
    tags.push($(e).text())
  })

  return { body, extractor, tags }
}

export default vnComDantriV1
