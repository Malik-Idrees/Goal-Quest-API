import mongoose from 'mongoose'

const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
