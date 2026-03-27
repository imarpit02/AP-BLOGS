import express from "express"
import { doLike, likeCount } from "../controllers/like.controller.js"
import { authenticate } from "../../middleware/authenticate.js"

const likeRoutes = express.Router()

likeRoutes.post('/like', authenticate, doLike)
likeRoutes.get('/get-like/:blogid', likeCount)


export default likeRoutes
