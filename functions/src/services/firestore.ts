import * as admin from 'firebase-admin'

import { Article } from '../models'
import { isProduction } from './firebase'

export interface GetArticlesConditions {
  afterMillis?: number
  beforeMillis?: number
  limit?: number
}

let _firestore: admin.firestore.Firestore
export const firestore = (): admin.firestore.Firestore => {
  if (typeof _firestore !== 'undefined') return _firestore
  _firestore = admin.firestore()
  _firestore.settings({ ignoreUndefinedProperties: true })
  return _firestore
}

const articles = (): admin.firestore.CollectionReference => firestore().collection('articles')
const articleTimestamp = 'timestamp'
const articleFirstTimestamp = 'first_timestamp'
const sanitizeArticleId = (url: string): string => url.replace(/[:/]+/g, '_')

const histories = (article: admin.firestore.DocumentReference): admin.firestore.CollectionReference => article.collection('histories')
const historyBody = 'body'
const historyTimestamp = 'timestamp'

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
  getArticles: async (conditions?: GetArticlesConditions): Promise<Article[]> => {
    let query = articles().orderBy(articleFirstTimestamp, 'desc')

    if (typeof conditions?.afterMillis === 'number') {
      query = query.where(articleFirstTimestamp, '>', admin.firestore.Timestamp.fromMillis(conditions.afterMillis))
    }
    if (typeof conditions?.beforeMillis === 'number') {
      query = query.where(articleFirstTimestamp, '<', admin.firestore.Timestamp.fromMillis(conditions.beforeMillis))
    }
    if (typeof conditions?.limit === 'number') {
      query = query.limit(conditions.limit)
    }

    const docs = await query.get()
    return docs.docs.map((doc) => ({ ...(doc.data() as Article), _id: doc.id }))
  },
  createArticle: async (article: Article) => {
    if (isProduction) {
      const documentPath = sanitizeArticleId(article.url)
      const timestamp = admin.firestore.FieldValue.serverTimestamp()
      await articles().doc(documentPath).create(
        {
          ...article,
          [articleFirstTimestamp]: timestamp,
          [articleTimestamp]: timestamp
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
        { ...article, [articleTimestamp]: timestamp },
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
          [historyBody]: article.body,
          [historyTimestamp]: article.timestamp
        }
      )
    } else {
      console.log('firestore.createArticleHistory', article)
    }
  }
}
