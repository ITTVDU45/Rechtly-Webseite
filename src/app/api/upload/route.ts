import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/db/connection';
import Document from '@/lib/db/models/Document';

// Maximale Dateigröße (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Erlaubte Dateitypen
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Keine Dateien hochgeladen' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];

    for (const file of files) {
      // Überprüfe Dateigröße
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Datei ${file.name} ist zu groß. Maximale Größe: 10MB` 
          },
          { status: 400 }
        );
      }

      // Überprüfe Dateityp
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Dateityp ${file.type} ist nicht erlaubt` 
          },
          { status: 400 }
        );
      }

      // Generiere eindeutigen Dateinamen
      const fileExtension = file.name.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      
      // Erstelle Upload-Verzeichnis
      const uploadDir = join(process.cwd(), 'uploads');
      await mkdir(uploadDir, { recursive: true });
      
      // Speichere Datei
      const filePath = join(uploadDir, uniqueFilename);
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      // Bestimme Dokumententyp
      let documentType: 'image' | 'pdf' | 'document' = 'document';
      if (file.type.startsWith('image/')) {
        documentType = 'image';
      } else if (file.type === 'application/pdf') {
        documentType = 'pdf';
      }

      // Speichere Dokument-Metadaten in MongoDB
      const document = new Document({
        filename: uniqueFilename,
        originalName: file.name,
        mimetype: file.type,
        size: file.size,
        path: filePath,
        documentType,
        uploadedAt: new Date()
      });

      await document.save();

      uploadedFiles.push({
        id: document._id.toString(),
        filename: uniqueFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        documentType
      });
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedFiles.length} Datei(en) erfolgreich hochgeladen`,
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Upload API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Fehler beim Hochladen der Dateien' 
      },
      { status: 500 }
    );
  }
}

// OPTIONS für CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
