declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
