import blacklist from './blacklist'
import config from './config'

const isBlacklisted = (url: string): boolean => {
  if (blacklist.urls.includes(url)) return true
  for (const pattern of blacklist.patterns) {
    if (url.match(pattern) !== null) return true
  }
  return false
}

export { config, isBlacklisted }
