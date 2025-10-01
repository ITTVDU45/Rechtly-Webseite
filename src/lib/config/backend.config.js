/* eslint-disable */
/* eslint-disable */
// Keep this JS module for compatibility with existing JS imports; forward to TS config where possible.
try { require('dotenv').config(); } catch (e) { /* ignore in build contexts */ }

const config = {
  // Server Konfiguration
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development'
  },

  // MongoDB Konfiguration
  mongodb: {
    uri: process.env.MONGODB_URI
  },

  // JWT Konfiguration
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  },

  // E-Mail Konfiguration
  email: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    from: process.env.EMAIL_FROM || 'noreply@rechtly.de'
  },

  // Support Konfiguration
  support: {
    phone: process.env.SUPPORT_PHONE || '+49 123 456789',
    email: process.env.SUPPORT_EMAIL || 'anfragen@rechtly.de'
  },

  // Domain Konfiguration
  domains: {
    base: process.env.NODE_ENV === 'production' ? 'https://rechtly.de' : 'http://localhost:3000',
    mandant: process.env.NODE_ENV === 'production' ? 'https://mandant.rechtly.de' : 'http://localhost:3000',
    anwalt: process.env.NODE_ENV === 'production' ? 'https://anwalt.rechtly.de' : 'http://localhost:3000',
    gutachter: process.env.NODE_ENV === 'production' ? 'https://gutachter.rechtly.de' : 'http://localhost:3000'
  },

  // Frontend URLs
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// In build contexts we prefer the TS config at src/lib/config/backend.config.ts; export a minimal shim here.
let minioClient = null;
let BUCKET_NAME = process.env.MINIO_BUCKET || null;

try {
  // Attempt to require TS-built config if present at runtime
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const tsConfig = require('./backend.config.ts');
  module.exports = tsConfig.default || tsConfig;
} catch (e) {
  module.exports = {
    ...config,
    minioClient,
    BUCKET_NAME,
    MINIO_PUBLIC_URL: process.env.MINIO_PUBLIC_URL
  };
}


