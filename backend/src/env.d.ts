declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    REDIS_URL: string
    SESSION_SECRET: string | string[]
    CORS_ORIGIN: string
  }
}
