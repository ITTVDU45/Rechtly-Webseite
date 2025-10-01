// Stub für MongoDB-Verbindung
// Diese Datei wird später mit echter MongoDB-Verbindung ersetzt

import type { Collection, Db, MongoClient } from 'mongodb';

// Dummy-MongoDB-Client für Vercel-Deployment
class DummyMongoClient {
  async connect(): Promise<DummyMongoClient> {
    console.log('Dummy MongoDB client: connect() called');
    return this;
  }

  db(name: string): DummyDb {
    console.log(`Dummy MongoDB client: db(${name}) called`);
    return new DummyDb(name);
  }

  close(): void {
    console.log('Dummy MongoDB client: close() called');
  }
}

class DummyDb {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  collection(name: string): DummyCollection {
    console.log(`Dummy MongoDB db: collection(${name}) called`);
    return new DummyCollection(name);
  }
}

class DummyCollection {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async insertOne(doc: Record<string, unknown>): Promise<{ insertedId: string }> {
    console.log(`Dummy MongoDB collection: insertOne() called with`, doc);
    return { insertedId: `dummy-id-${Date.now()}` };
  }

  async findOne(query: Record<string, unknown>): Promise<null> {
    console.log(`Dummy MongoDB collection: findOne() called with`, query);
    return null;
  }

  async find(): Promise<{ toArray: () => Promise<[]> }> {
    console.log(`Dummy MongoDB collection: find() called`);
    return { toArray: async () => [] };
  }

  async updateOne(): Promise<{ modifiedCount: number }> {
    console.log(`Dummy MongoDB collection: updateOne() called`);
    return { modifiedCount: 0 };
  }

  async deleteOne(): Promise<{ deletedCount: number }> {
    console.log(`Dummy MongoDB collection: deleteOne() called`);
    return { deletedCount: 0 };
  }
}

// Exportiere den Dummy-Client
export const mongoClient = new DummyMongoClient();

// Dummy-Promise für clientPromise
export const clientPromise = Promise.resolve(mongoClient as unknown as MongoClient);

// Dummy-Funktion für connectDB
async function connectDB(): Promise<void> {
  console.log('Dummy connectDB() called');
}

export default connectDB;