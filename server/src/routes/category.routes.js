import express from "express"
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/category.controller.js"
import { onlyAdmin } from "../../middleware/onlyAdmin.js"

const categoryRoutes = express.Router()

categoryRoutes.post('/add', onlyAdmin, addCategory)
categoryRoutes.put('/update/:categoryid', onlyAdmin, updateCategory)
categoryRoutes.get('/show/:categoryid', onlyAdmin, showCategory)
categoryRoutes.delete('/delete/:categoryid', onlyAdmin, deleteCategory)

categoryRoutes.get('/all-category', getAllCategory)

export default categoryRoutes