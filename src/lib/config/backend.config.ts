/* eslint-disable @typescript-eslint/no-explicit-any */
// Zentraler Backend-Config-Adapter (stubs für Build/Client-Umgebung)

const config = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },
  mongodb: { uri: process.env.MONGODB_URI },
  jwt: { secret: process.env.JWT_SECRET, expiresIn: '24h' },
  email: {
    host: process.env.SMTP_HOST || process.env.EMAIL_HOST,
    port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || process.env.EMAIL_SECURE === 'true',
    auth: { 
      user: process.env.SMTP_USER || process.env.EMAIL_USER, 
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS 
    },
    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || 'noreply@rechtly.de'
  },
  support: {
    phone: process.env.SUPPORT_PHONE || '+49 123 456789',
    email: process.env.ADMIN_EMAIL || process.env.SUPPORT_EMAIL || 'info@rechtly.de'
  },
  domains: {
    base: process.env.NODE_ENV === 'production' ? 'https://rechtly.de' : 'http://localhost:3000'
  },
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Einfacher Stub für MinIO-Client
const minioClient = {
  bucketExists: async () => false,
  makeBucket: async () => { throw new Error('MinIO not available'); },
  getObject: async () => { throw new Error('MinIO not available'); },
  putObject: async () => { throw new Error('MinIO not available'); },
  removeObject: async () => { throw new Error('MinIO not available'); }
};

const BUCKET_NAME = process.env.MINIO_BUCKET || null;

export default config;
export { minioClient, BUCKET_NAME };