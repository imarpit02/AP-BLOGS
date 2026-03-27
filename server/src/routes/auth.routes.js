import express from "express"
import { googleLogin, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js"
import { authenticate } from "../../middleware/authenticate.js"

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/google-login', googleLogin)
router.post('/logout',  logoutUser)

export default router