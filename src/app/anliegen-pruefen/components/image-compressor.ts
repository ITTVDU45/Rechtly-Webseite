export async function compressAndValidateImage(file: File): Promise<File> {
  // lightweight passthrough for now; can integrate browser-image-compression
  if (!file.type.startsWith('image/')) throw new Error('Nur Bilddateien erlaubt');
  // return same file for now
  return file;
}


