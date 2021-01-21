import vnComDantriV1 from './dantri.com.vn/v1'
import vnTuoitreV1 from './tuoitre.vn/v1'
import vnVietnamnetV1 from './vietnamnet.vn/v1'
import netVnexpressV1 from './vnexpress.net/v1'

import type { Extracted, ExtractorItem } from './interfaces'

const extractors: ExtractorItem[] = [
  {
    pattern: RegExp('^https://dantri.com.vn/.+$'),
    extract: vnComDantriV1
  },
  {
    pattern: RegExp('^https://[^/]*tuoitre.vn/.+$'),
    extract: vnTuoitreV1
  },
  {
    pattern: RegExp('^https://[^/]*vietnamnet.vn/.+$'),
    extract: vnVietnamnetV1
  },
  {
    pattern: RegExp('^https://vnexpress.net/.+$'),
    extract: netVnexpressV1
  }
]

const extract = (url: string, html: string): Extracted | null => {
  for (const extractor of extractors) {
    if (url.match(extractor.pattern) == null) continue

    const extracted = extractor.extract(html)
    if (extracted !== null) return extracted
  }

  return null
}

export default extract
