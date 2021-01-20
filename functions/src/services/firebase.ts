import * as admin from 'firebase-admin'

export const isProduction = typeof process.env.FUNCTION_TARGET === 'string'

if (isProduction) {
  admin.initializeApp()
}
