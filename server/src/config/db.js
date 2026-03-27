import mongoose from 'mongoose'
import config from './config.js'


const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI)
      .then(() => {
      console.log("Connected to DB")
    })
  } catch (error) {
    console.error("DB connection failed", error)
  }
}

export default connectDB