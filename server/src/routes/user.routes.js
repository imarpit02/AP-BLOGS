import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js"
import upload from "../config/multer.js"
import { authenticate } from "../../middleware/authenticate.js"

const userRouter = express.Router()

userRouter.use(authenticate)
userRouter.get('/get-user/:userid', getUser)
userRouter.put('/update-user/:userid', upload.single('file'), updateUser)
userRouter.get('/get-all-users', getAllUsers)
userRouter.delete('/delete/:id', deleteUser)

export default userRouter