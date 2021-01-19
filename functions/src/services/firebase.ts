import * as admin from 'firebase-admin'

export const isProduction = typeof process.env.FUNCTION_TARGET === 'string'

if (isProduction) {
  admin.initializeApp()
}

let _firestore: admin.firestore.Firestore
export const firestore = (): admin.firestore.Firestore => {
  if (typeof _firestore !== 'undefined') return _firestore
  _firestore = admin.firestore()
  _firestore.settings({ ignoreUndefinedProperties: true })
  return _firestore
}

export const firestoreServerTimestamp = (): admin.firestore.FieldValue => admin.firestore.FieldValue.serverTimestamp()
