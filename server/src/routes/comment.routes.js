import express from "express"
import { addComment, commentCount, deleteComment, getAllComments, getComments } from "../controllers/comment.controller.js"
import { authenticate } from "../../middleware/authenticate.js"

const commentRoutes = express.Router()

commentRoutes.post('/add', authenticate, addComment)
commentRoutes.get('/get/:blogid', getComments)
commentRoutes.get('/get-count/:blogid', commentCount)
commentRoutes.get('/get-all-comments', authenticate, getAllComments)
commentRoutes.delete('/delete/:commentid', authenticate, deleteComment)

export default commentRoutes
