import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV // 'development' or 'production'

const development = {
    MONGO_URI: process.env.MONGO_URI_TEST || '',
    PORT: parseInt(process.env.DEV_PORT) || 5000,

    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db',
    },
}

const production = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: parseInt(process.env.PORT) || 5000,
}

// console.log(JSON.stringify(development, null, 4))

const config = { development, production }

export default config[env]
