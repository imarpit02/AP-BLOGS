import { handleError } from "../helpers/handleErrors.js"
import blogModel from "../models/blog.model.js"
import categoryModel from "../models/category.model.js"
import { encode } from "entities"
import uploadFile from "../services/imagekit.service.js"
import userModel from "../models/user.model.js"

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data)
    let featuredImage = ''
    if (req.file) {
      try {
        const result = await uploadFile(req.file.buffer)
        featuredImage = result.url;
      } catch (error) {
        return next(handleError(500, error.message));
      }
    }
    const blog = await blogModel.create({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent)
    })
    res.status(200).json({
      success: true,
      message: "Blog added successfully"
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params

    const data = JSON.parse(req.body.data)

    const blog = await blogModel.findById(blogid)

    blog.category = data.category
    blog.title = data.title
    blog.slug = data.slug
    blog.blogContent = encode(data.blogContent)
    let featuredImage = blog.featuredImage

    if (req.file) {
      try {
        const result = await uploadFile(req.file.buffer)
        featuredImage = result.url;
      } catch (error) {
        return next(handleError(500, error.message));
      }
    }

    blog.featuredImage = featuredImage

    await blog.save()

    res.status(200).json({
      success: true,
      message: "Blog updated successfully"
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params
    const blog = await blogModel.findById(blogid).populate('category', 'name')
    res.status(200).json({
      blog
    })
    if (!blog) {
      return next(handleError(404, "Data not found"))
    }
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params
    await blogModel.findByIdAndDelete(blogid)
    res.status(200).json({
      success: true,
      message: "Blog Deleted",
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const showAllBlog = async (req, res, next) => {
  try {
    const decodedUser = req.user
    const user = await userModel.findById(decodedUser.id)
    let blog
    if (user.role === 'admin') {  
      blog = await blogModel.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
    } else {
      blog = await blogModel.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
    }
    res.status(200).json({
      blog
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await blogModel.findOne({slug}).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
    res.status(200).json({
      blog
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getRelatedBlogs = async (req, res, next) => {
  try {
    const { category, blog } = req.params;
    const categoryData = await categoryModel.findOne({ slug: category })
    if (!categoryData) {
      return next(404, "Category data not found")
    }
    const categoryId = categoryData._id
    const relatedBlogs = await blogModel.find({ category: categoryId, slug: { $ne: blog } }).lean().exec()
    res.status(200).json({
      relatedBlogs
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getBlogsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await categoryModel.findOne({ slug: category })
    if (!categoryData) {
      return next(404, "Category data not found")
    }
    const categoryId = categoryData._id
    const blog = await blogModel.find({ category: categoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
    res.status(200).json({
      blog,
      categoryData
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const search = async (req, res, next) => {
  try {
    const { q } = req.query
    const blog = await blogModel.find({ title: { $regex: q, $options: 'i'} }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
    res.status(200).json({
      blog,
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getAllBlogs = async (req, res, next) => {
  try {
    const blog = await blogModel.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
    res.status(200).json({
      blog
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}
