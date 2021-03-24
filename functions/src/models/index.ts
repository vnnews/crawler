import * as admin from 'firebase-admin'

export interface Article {
  _id?: string
  first_timestamp?: admin.firestore.Timestamp
  timestamp?: admin.firestore.Timestamp

  url: string
  body: string
  has_history?: boolean
  metadata: { [key: string]: string }
  tags?: string[]
  type?: 'text' | 'video'
}

export interface Link {
  _id?: string
  last_timestamp?: admin.firestore.Timestamp

  url: string
  type: 'site' | 'article'
}
