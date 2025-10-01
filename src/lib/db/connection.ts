import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://developer_db_user:TKrsQhD5FazKjiTO@rechtly-webseite.5cjxouj.mongodb.net/?retryWrites=true&w=majority&appName=Rechtly-webseite";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

// Mongoose-Verbindung für Mongoose-basierte Operationen
async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully with Mongoose');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// MongoDB Native Client für direkte MongoDB-Operationen
export const mongoClient = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Singleton-Verbindung für den MongoDB Native Client
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In der Entwicklung verwenden wir eine globale Variable, um die Verbindung zu speichern
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = mongoClient.connect();
  }
  
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In der Produktion erstellen wir eine neue Verbindung
  clientPromise = mongoClient.connect();
}

export { clientPromise };
export default connectDB;