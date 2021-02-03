declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    POSTGRES_HOST: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
    REDIS_HOST: string
    SESSION_SECRET: string
    CORS_ORIGIN: string
  }
}
