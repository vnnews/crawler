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
}
