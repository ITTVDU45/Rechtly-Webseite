// Zentraler Backend-Config-Adapter (stubs für Build/Client-Umgebung)

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

interface SupportConfig {
  phone: string;
  email: string;
}

interface DomainsConfig {
  base: string;
}

interface ServerConfig {
  port: number | string;
  env: string;
}

interface AppConfig {
  server: ServerConfig;
  mongodb: { uri: string | undefined };
  jwt: { secret: string | undefined; expiresIn: string };
  email: EmailConfig;
  support: SupportConfig;
  domains: DomainsConfig;
  FRONTEND_URL: string;
  LOG_LEVEL: string;
}

const config: AppConfig = {
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },
  mongodb: { uri: process.env.MONGODB_URI },
  jwt: { secret: process.env.JWT_SECRET, expiresIn: '24h' },
  email: {
    host: process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || process.env.EMAIL_SECURE === 'true',
    auth: { 
      user: process.env.SMTP_USER || process.env.EMAIL_USER || 'user@example.com', 
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || 'password' 
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
interface MinioClientStub {
  bucketExists: () => Promise<boolean>;
  makeBucket: () => Promise<void>;
  getObject: () => Promise<never>;
  putObject: () => Promise<never>;
  removeObject: () => Promise<never>;
}

const minioClient: MinioClientStub = {
  bucketExists: async () => false,
  makeBucket: async () => { throw new Error('MinIO not available'); },
  getObject: async () => { throw new Error('MinIO not available'); },
  putObject: async () => { throw new Error('MinIO not available'); },
  removeObject: async () => { throw new Error('MinIO not available'); }
};

const BUCKET_NAME = process.env.MINIO_BUCKET || null;

export default config;
export { minioClient, BUCKET_NAME };