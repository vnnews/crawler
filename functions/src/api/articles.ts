import { Request, Response } from 'firebase-functions'

import { firestore } from '../services'

const articles = async (request: Request, response: Response): Promise<void> => {
  const { after, before, limit } = request.query
  const defaultLimit = 20

  const articles = await firestore.getArticles({
    afterMillis: (typeof after === 'string' ? parseInt(after, 10) : undefined),
    beforeMillis: typeof before === 'string' ? parseInt(before, 10) : undefined,
    limit: (typeof limit === 'string' ? parseInt(limit, 10) : undefined) ?? defaultLimit
  })
  response.send({
    articles: articles.map((article) => ({
      ...article,
      timestamp: article.timestamp?.toMillis() ?? undefined,
      first_timestamp: article.first_timestamp?.toMillis() ?? undefined
    }))
  })
}

export default articles
