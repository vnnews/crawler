import * as cheerio from 'cheerio'

import type { Extracted } from '../../interfaces'

const vnTuoitreVideoV1 = (html: string): Extracted | null => {
  const $ = cheerio.load(html)

  const $video = $('.video-highlight')
  if ($video.length !== 1) return null

  const body = $video.find('p.sapo').html()?.trim() ?? ''
  if (body.length === 0) return null
  const extractor = __filename

  const $tags = $video.find('.tags')
  const tags: string[] = []
  $tags.find('a').each((_, e) => {
    const text = $(e).text()
    if (text.length > 0) tags.push(text)
  })

  return { body, extractor, tags, type: 'video' }
}

export default vnTuoitreVideoV1
