import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.PORT,
  FRONTEND_URI: process.env.FRONTEND_URI,
  MONGO_URI: process.env.MONGO_URI ,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}

export default config;