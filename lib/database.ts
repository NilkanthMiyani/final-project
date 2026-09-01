import mongoose from 'mongoose';

/**
 * Serverless-safe connection cache.
 *
 * Every lambda invocation may reuse a warm container, so the connection promise
 * is stashed on `globalThis` to avoid opening a new pool per request (and to
 * avoid a connection storm during hot-reload in development).
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalWithMongoose._mongooseCache = cached;

const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set.');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      // Both sites share this cluster and this connection user, so the
      // database name is the only thing separating their content. Without it
      // they would both write the same `profile` singleton and the two
      // portfolios would render identically.
      dbName: process.env.MONGODB_DB || 'portfolio',
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the failed promise so the next request retries instead of
    // permanently reusing a rejected connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default connectToDatabase;
