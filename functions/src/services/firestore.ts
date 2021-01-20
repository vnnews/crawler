import * as admin from 'firebase-admin'

import { isProduction } from './firebase'

interface Article {
  _id?: string
  first_timestamp?: admin.firestore.Timestamp
  timestamp?: admin.firestore.Timestamp

  url: string
  metadata: { [key: string]: string }
  body: string
  tags?: string[]
}

let _firestore: admin.firestore.Firestore
export const firestore = (): admin.firestore.Firestore => {
  if (typeof _firestore !== 'undefined') return _firestore
  _firestore = admin.firestore()
  _firestore.settings({ ignoreUndefinedProperties: true })
  return _firestore
}

const articles = (): admin.firestore.CollectionReference => firestore().collection('articles')
const sanitizeArticleId = (url: string): string => url.replace(/[:/]+/g, '_')

export default {
  getArticleByUrl: async (url: string): Promise<Article | undefined> => {
    const documentPath = sanitizeArticleId(url)
    const doc = await articles().doc(documentPath).get()
    if (!doc.exists) return undefined

    return { ...(doc.data() as Article), _id: doc.id }
  },
  createArticle: async (article: Article) => {
    if (isProduction) {
      const documentPath = sanitizeArticleId(article.url)
      const timestamp = admin.firestore.FieldValue.serverTimestamp()
      await articles().doc(documentPath).create(
        {
          ...article,
          first_timestamp: timestamp,
          timestamp
        }
      )
    } else {
      console.log('firestore.createArticle', article)
    }
  },
  setArticle: async (article: Article) => {
    if (isProduction) {
      const documentPath = sanitizeArticleId(article.url)
      const timestamp = admin.firestore.FieldValue.serverTimestamp()
      await articles().doc(documentPath).set(
        { ...article, timestamp },
        { merge: true }
      )
    } else {
      console.log('firestore.updateArticle', article)
    }
  }
}
