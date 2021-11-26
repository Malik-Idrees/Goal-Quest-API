import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV // 'development' or 'production' or 'test'

const development = {
    NODE_ENV: env,
    MONGO_URI: process.env.MONGO_URI_DEV || '',
    PORT: parseInt(process.env.DEV_PORT) || 5000,

    // For mongoDB Instances running locally!
    // db: {
    //     host: process.env.DEV_DB_HOST || 'localhost',
    //     port: parseInt(process.env.DEV_DB_PORT) || 27017,
    //     name: process.env.DEV_DB_NAME || 'db',
    // },
}

const production = {
    NODE_ENV: env,
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: parseInt(process.env.PORT) || 5000,
}

const test = {
    NODE_ENV: env,
    MONGO_URI: process.env.MONGO_URI_TEST || '',
    PORT: parseInt(process.env.TEST_PORT) || 5000,
}

// console.log(JSON.stringify(development, null, 4))

const config = { development, production, test }

export default config[env]
