import * as admin from 'firebase-admin'

import { Article } from '../models'
import { isProduction } from './firebase'

let _firestore: admin.firestore.Firestore
export const firestore = (): admin.firestore.Firestore => {
  if (typeof _firestore !== 'undefined') return _firestore
  _firestore = admin.firestore()
  _firestore.settings({ ignoreUndefinedProperties: true })
  return _firestore
}

const articles = (): admin.firestore.CollectionReference => firestore().collection('articles')
const sanitizeArticleId = (url: string): string => url.replace(/[:/]+/g, '_')

const histories = (article: admin.firestore.DocumentReference): admin.firestore.CollectionReference => article.collection('histories')

export default {
  getArticleByUrl: async (url: string): Promise<Article | undefined> => {
    if (isProduction) {
      const documentPath = sanitizeArticleId(url)
      const doc = await articles().doc(documentPath).get()
      if (!doc.exists) return undefined

      return { ...(doc.data() as Article), _id: doc.id }
    } else {
      return undefined
    }
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
  },
  createArticleHistory: async (article: Article) => {
    if (isProduction) {
      const articleDoc = articles().doc(sanitizeArticleId(article.url))
      await histories(articleDoc).doc().create(
        {
          body: article.body,
          timestamp: article.timestamp
        }
      )
    } else {
      console.log('firestore.createArticleHistory', article)
    }
  }
}
