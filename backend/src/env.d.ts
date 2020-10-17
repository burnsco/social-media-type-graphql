declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    COOKIE_NAME: string;
  }
}
