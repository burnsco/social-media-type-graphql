declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
