import * as admin from 'firebase-admin'

import { isProduction } from './firebase'

export default {
  exists: async (bucketName: string, fileName: string): Promise<boolean> => {
    if (isProduction) {
      const result = await admin.storage().bucket(bucketName).file(fileName).exists()
      return result[0]
    } else {
      return false
    }
  },
  save: async (bucketName: string, fileName: string, data: string): Promise<void> => {
    if (isProduction) {
      await admin.storage().bucket(bucketName).file(fileName).save(data)
    } else {
      console.log('storage.save', bucketName, fileName, data)
    }
  }
}
