import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './routes/user.routes.js';
import router from './routes/auth.routes.js'
import config from './config/config.js';
import categoryRoutes from './routes/category.routes.js';
import blogRoutes from './routes/blog.routes.js';
import commentRoutes from './routes/comment.routes.js';
import likeRoutes from './routes/like.routes.js';

const app = express();

// app.use(cors({
//   origin: config.FRONTEND_URI,
//   credentials: true
// }))



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ap-blogs-zneh.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.options("*", cors())

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', router)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/like', likeRoutes)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error.'
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

export default app