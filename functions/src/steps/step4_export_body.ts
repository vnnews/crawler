import { firestore, logger, storage } from '../services'

const exportBody = async (bucketName: string): Promise<void> => {
  const millisInADay = 86400000
  const afterMillis = Math.floor(Date.now() / millisInADay - 1) * millisInADay
  const fileName = `exportBody/${afterMillis}.txt`
  const logPayload: any = { bucketName, afterMillis }
  if (await storage.exists(bucketName, fileName)) {
    logger.debug('exportBody skipped', logPayload)
    return
  }

  const beforeMillis = afterMillis + millisInADay
  logPayload.beforeMillis = beforeMillis
  const articles = await firestore.getArticles({ afterMillis, beforeMillis })
  logPayload.articles = { length: articles.length }

  let data = ''
  for (const article of articles) {
    data += article.body + '\n'
  }
  logPayload.data = { length: data.length }

  if (data.length > 0) {
    await storage.save(bucketName, fileName, data)
    logger.info('exportBody OK', logPayload)
  } else {
    logger.error('exportBody failed', logPayload)
  }
}

export default exportBody
