import * as cheerio from 'cheerio'

import type { Extracted } from '../interfaces'

const netVnexpressV1 = (html: string): Extracted | null => {
  const $ = cheerio.load(html)

  $('.hidden').remove()

  const $detail = $('.page-detail > .container > .sidebar-1')
  const descriptionClass = 'description'
  const description = $detail.find(`.${descriptionClass}`).html()?.trim() ?? ''

  const articleClass = 'fck_detail'
  const article = $(`.${articleClass}`).html()?.trim() ?? ''
  if (article.length === 0) return null

  const body = (description.length > 0 ? `<div class="${descriptionClass}">${description}</div>\n\n` : '') + `<article class="${articleClass}">${article}</article>`
  const extractor = __filename

  return { body, extractor, type: 'text' }
}

export default netVnexpressV1
