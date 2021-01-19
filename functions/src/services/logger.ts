import { logger } from 'firebase-functions'

export default {
  error: (...args: any[]) => logger.error(...args),
  log: (...args: any[]) => logger.log(...args),
  warn: (...args: any[]) => logger.warn(...args)
}
