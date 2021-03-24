import { logger } from 'firebase-functions'

export default {
  debug: (...args: any[]) => logger.debug(...args),
  error: (...args: any[]) => logger.error(...args),
  info: (...args: any[]) => logger.info(...args),
  warn: (...args: any[]) => logger.warn(...args)
}
