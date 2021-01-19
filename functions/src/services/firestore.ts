import { firestore, firestoreServerTimestamp, isProduction } from './firebase'

interface Article {
  url: string
  metadata: { [key: string]: string }
  body: string
  tags?: string[]
}

export default {
  setArticle: async (article: Article) => {
    if (isProduction) {
      const documentPath = article.url.replace(/[:/]+/g, '_')
      await firestore().collection('articles').doc(documentPath).set({
        ...article,
        timestamp: firestoreServerTimestamp()
      }, { merge: true })
    } else {
      console.log('firestore.setArticle', article)
    }
  }
}
