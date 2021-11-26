import connectDB from '../config/db.js'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer

before(async () => {
    mongoServer = await MongoMemoryServer.create()
    const MONGO_URI = mongoServer.getUri()
    await connectDB(MONGO_URI)
})

after(async () => {
    await closeDatabase()
    await mongoose.disconnect()
    await mongoServer.stop()
})

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
}

export const clearDatabase = async () => {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}
