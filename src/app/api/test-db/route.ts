import { NextResponse } from 'next/server';
import { mongoClient } from '@/lib/db/connection';

export async function GET() {
  try {
    // Verbindung zur MongoDB herstellen
    await mongoClient.connect();
    
    // Ping-Befehl ausführen, um die Verbindung zu testen
    await mongoClient.db("admin").command({ ping: 1 });
    
    return NextResponse.json({
      success: true,
      message: "MongoDB-Verbindung erfolgreich hergestellt!",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("MongoDB-Verbindungsfehler:", error);
    
    return NextResponse.json({
      success: false,
      message: "Fehler bei der Verbindung zur MongoDB",
      error: error.message
    }, { status: 500 });
  }
}
