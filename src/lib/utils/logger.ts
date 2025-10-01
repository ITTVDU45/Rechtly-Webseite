interface LogLevel {
  ERROR: 0;
  WARN: 1;
  INFO: 2;
  DEBUG: 3;
}

type MetaData = Record<string, unknown> | undefined;

const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  private logLevel: number;

  constructor() {
    this.logLevel = LOG_LEVELS[process.env.LOG_LEVEL as keyof LogLevel] || LOG_LEVELS.INFO;
  }

  private formatMessage(level: string, message: string, meta?: MetaData): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  }

  private shouldLog(level: number): boolean {
    return level <= this.logLevel;
  }

  error(message: string, meta?: MetaData): void {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error(this.formatMessage('ERROR', message, meta));
    }
  }

  warn(message: string, meta?: MetaData): void {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  info(message: string, meta?: MetaData): void {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      console.info(this.formatMessage('INFO', message, meta));
    }
  }

  debug(message: string, meta?: MetaData): void {
    if (this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.debug(this.formatMessage('DEBUG', message, meta));
    }
  }

  // Spezielle Logging-Methoden für verschiedene Bereiche
  api(message: string, meta?: MetaData): void {
    this.info(`[API] ${message}`, meta);
  }

  db(message: string, meta?: MetaData): void {
    this.info(`[DB] ${message}`, meta);
  }

  email(message: string, meta?: MetaData): void {
    this.info(`[EMAIL] ${message}`, meta);
  }

  upload(message: string, meta?: MetaData): void {
    this.info(`[UPLOAD] ${message}`, meta);
  }

  auth(message: string, meta?: MetaData): void {
    this.info(`[AUTH] ${message}`, meta);
  }

  // Performance-Logging
  performance(operation: string, duration: number, meta?: MetaData): void {
    this.info(`[PERF] ${operation} took ${duration}ms`, meta);
  }

  // Request-Logging
  request(method: string, url: string, statusCode: number, duration: number): void {
    this.info(`[REQUEST] ${method} ${url} - ${statusCode} (${duration}ms)`);
  }
}

const loggerInstance = new Logger();
export default loggerInstance;