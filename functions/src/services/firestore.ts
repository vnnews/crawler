import * as admin from 'firebase-admin'

import { Article, Link } from '../models'
import { isProduction } from './firebase'

export interface GetArticlesConditions {
  afterMillis?: number
  beforeMillis?: number
  fields?: string[]
  limit?: number
}

let _firestore: admin.firestore.Firestore
export const firestore = (): admin.firestore.Firestore => {
  if (typeof _firestore !== 'undefined') return _firestore
  _firestore = admin.firestore()
  _firestore.settings({ ignoreUndefinedProperties: true })
  return _firestore
}

const sanitizeUrl = (url: string): string => url.replace(/[:/]+/g, '_')

const articles = (): admin.firestore.CollectionReference => firestore().collection('articles')
const articleTimestamp = 'timestamp'
const articleFirstTimestamp = 'first_timestamp'

const histories = (article: admin.firestore.DocumentReference): admin.firestore.CollectionReference => article.collection('histories')
const historyBody = 'body'
const historyTimestamp = 'timestamp'

const links = (): admin.firestore.CollectionReference => firestore().collection('links')
const linkLastTimestamp = 'last_timestamp'

export default {
  getArticleByUrl: async (url: string): Promise<Article | undefined> => {
    if (isProduction) {
      const documentPath = sanitizeUrl(url)
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
    if (typeof conditions?.fields === 'object') {
      query = query.select(...conditions.fields)
    }

    const docs = await query.get()
    return docs.docs.map((doc) => ({ ...(doc.data() as Article), _id: doc.id }))
  },
  createArticle: async (article: Article) => {
    if (isProduction) {
      const documentPath = sanitizeUrl(article.url)
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
      const documentPath = sanitizeUrl(article.url)
      const timestamp = admin.firestore.FieldValue.serverTimestamp()
      await articles().doc(documentPath).set(
        { ...article, [articleTimestamp]: timestamp },
        { merge: true }
      )
    } else {
      console.log('firestore.setArticle', article)
    }
  },
  createArticleHistory: async (article: Article) => {
    if (isProduction) {
      const articleDoc = articles().doc(sanitizeUrl(article.url))
      await histories(articleDoc).doc().create(
        {
          [historyBody]: article.body,
          [historyTimestamp]: article.timestamp
        }
      )
    } else {
      console.log('firestore.createArticleHistory', article)
    }
  },
  getLink: async (url: string): Promise<Link | undefined> => {
    if (isProduction) {
      const documentPath = sanitizeUrl(url)
      const doc = await links().doc(documentPath).get()
      if (!doc.exists) return undefined

      return { ...(doc.data() as Link), _id: doc.id }
    } else {
      return undefined
    }
  },
  setLink: async (link: Link) => {
    if (isProduction) {
      const documentPath = sanitizeUrl(link.url)
      const timestamp = admin.firestore.FieldValue.serverTimestamp()
      await links().doc(documentPath).set(
        { ...link, [linkLastTimestamp]: timestamp },
        { merge: true }
      )
    } else {
      console.log('firestore.setLink', link)
    }
  }
}
