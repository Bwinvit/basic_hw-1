import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing environment variable: MONGODB_URI')
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
  // eslint-disable-next-line no-var
  var _mongoDb: Db | undefined
}

/**
 * Returns a cached MongoDB database instance.
 */
export async function getDb(): Promise<Db> {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri)
  }
  if (!globalThis._mongoDb) {
    await globalThis._mongoClient.connect()
    globalThis._mongoDb = globalThis._mongoClient.db()
  }
  return globalThis._mongoDb
}
