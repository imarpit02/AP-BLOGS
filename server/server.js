import dotenv from 'dotenv'
import app from './src/app.js'
import connectDB from './src/config/db.js'
import config from './src/config/config.js'

dotenv.config()

const PORT = config.PORT || 3000

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

