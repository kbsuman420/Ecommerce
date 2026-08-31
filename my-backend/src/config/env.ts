import 'dotenv/config'

interface EnvConfig {
    NODE_ENV: 'development' | 'production' | 'test',
    PORT: number,
    DATABASE_URL: string
}

function getEnv(): EnvConfig {
    const DATABASE_URL = process.env.DATABASE_URL;

    if(!DATABASE_URL) {
        throw new Error("Missing required enviorment variable: DATABASE URL");
    }

    return {
        DATABASE_URL,
        PORT: Number(process.env.PORT),
        NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development'
    }
}

export { getEnv }