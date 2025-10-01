interface Config {
  // Server Konfiguration
  server: {
    port: number;
    env: string;
  };

  // MongoDB Konfiguration
  mongodb: {
    uri: string;
  };

  // JWT Konfiguration
  jwt: {
    secret: string;
    expiresIn: string;
  };

  // E-Mail Konfiguration
  email: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: string;
  };

  // Support Konfiguration
  support: {
    phone: string;
    email: string;
  };

  // Domain Konfiguration
  domains: {
    base: string;
    mandant: string;
    anwalt: string;
    gutachter: string;
  };

  // Frontend URLs
  FRONTEND_URL: string;
  
  // Logging
  LOG_LEVEL: string;

  // File Upload
  upload: {
    maxFileSize: number;
    allowedTypes: string[];
    uploadDir: string;
  };
}

const config: Config = {
  // Server Konfiguration
  server: {
    port: parseInt(process.env.PORT || '3000'),
    env: process.env.NODE_ENV || 'development'
  },

  // MongoDB Konfiguration
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rechtly'
  },

  // JWT Konfiguration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    expiresIn: '24h'
  },

  // E-Mail Konfiguration
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    },
    from: process.env.SMTP_FROM || 'noreply@rechtly.de'
  },

  // Support Konfiguration
  support: {
    phone: process.env.SUPPORT_PHONE || '0800-123-4567',
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
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // File Upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    uploadDir: process.env.UPLOAD_DIR || './uploads'
  }
};

export default config;
