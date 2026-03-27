import { handleError } from "../helpers/handleErrors.js"
import categoryModel from "../models/category.model.js"

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body
    const category = await categoryModel.create({
      name,
      slug
    })
    res.status(200).json({
      success: true,
      message: "Added"
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const showCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params
    const category = await categoryModel.findById(categoryid)
    res.status(200).json({
      category
    })
    if (!category) {
      return next(handleError(404, "Data not found"))
    }
    } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body
    const { categoryid } = req.params
    const category = await categoryModel.findByIdAndUpdate(categoryid, {
      name,
      slug
    }, { new: true })
    
    res.status(200).json({
      success: true,
      message: "Updated",
      category
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryid } = req.params
    await categoryModel.findByIdAndDelete(categoryid)
    res.status(200).json({
      success: true,
      message: "Category Deleted",
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find().sort({ name: 1 }).lean().exec()
    res.status(200).json({
      category
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}
