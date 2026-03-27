import express from "express"
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogsByCategory, getRelatedBlogs, search, showAllBlog, updateBlog } from "../controllers/blog.controller.js"
import upload from "../config/multer.js"
import { authenticate } from "../../middleware/authenticate.js"

const blogRoutes = express.Router()

blogRoutes.post('/add', authenticate, upload.single('file'), addBlog)
blogRoutes.get('/edit/:blogid', authenticate, editBlog)
blogRoutes.put('/update/:blogid', authenticate, upload.single('file'), updateBlog)
blogRoutes.delete('/delete/:blogid', authenticate, deleteBlog)
blogRoutes.get('/get-all', authenticate, showAllBlog)

blogRoutes.get('/get-blog/:slug', getBlog)
blogRoutes.get('/get-related-blogs/:category/:blog', getRelatedBlogs)
blogRoutes.get('/get-blogs-by-category/:category', getBlogsByCategory)
blogRoutes.get('/blogs', getAllBlogs)
blogRoutes.get('/search', search)

export default blogRoutes
