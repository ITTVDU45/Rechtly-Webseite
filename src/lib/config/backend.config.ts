/* eslint-disable @typescript-eslint/no-explicit-any */
// Zentraler Backend-Config-Adapter (stubs für Build/Client-Umgebung)
import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },
  mongodb: { uri: process.env.MONGODB_URI },
  jwt: { secret: process.env.JWT_SECRET, expiresIn: '24h' },
  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    from: process.env.EMAIL_FROM || 'noreply@rechtly.de'
  },
  support: {
    phone: process.env.SUPPORT_PHONE || '+49 123 456789',
    email: process.env.SUPPORT_EMAIL || 'anfragen@rechtly.de'
  },
  domains: {
    base: process.env.NODE_ENV === 'production' ? 'https://rechtly.de' : 'http://localhost:3000'
  },
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

let minioClient: any = {
  bucketExists: async () => false,
  makeBucket: async () => { throw new Error('MinIO not available'); },
  getObject: async () => { throw new Error('MinIO not available'); },
  putObject: async () => { throw new Error('MinIO not available'); },
  removeObject: async () => { throw new Error('MinIO not available'); }
};

const BUCKET_NAME = process.env.MINIO_BUCKET || null;

// Try to dynamically load Minio in Node runtime; if present, initialize client.
(async () => {
  try {
    const MinioMod = await import('minio');
    const Minio = (MinioMod as any).Client ? MinioMod : MinioMod.default || MinioMod;
    const getHostname = (url: string | undefined) => {
      try { return url ? new URL(url).hostname : '' } catch { return url }
    };
    minioClient = new Minio.Client({
      endPoint: getHostname(process.env.MINIO_ENDPOINT),
      port: parseInt(process.env.MINIO_PORT || '9000'),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ROOT_USER,
      secretKey: process.env.MINIO_ROOT_PASSWORD
    });
    if (minioClient && BUCKET_NAME) {
      try { const exists = await minioClient.bucketExists(BUCKET_NAME); if (!exists) await minioClient.makeBucket(BUCKET_NAME); } catch (e) { console.warn('MinIO bucket init failed', e) }
    }
  } catch (e) {
    // ignore: MinIO not installed in this environment
  }
})();

export default config;
export { minioClient, BUCKET_NAME };






