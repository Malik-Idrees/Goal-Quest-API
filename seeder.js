import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import User from './models/userModel.js'

import users from './data/users.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()

        await User.insertMany(users)

        console.log(`Data Imported!`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()

        console.log(`Data Destroyed!`.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2]) {
    destroyData()
} else {
    importData()
}
