import { handleError } from "../helpers/handleErrors.js"
import commentModel from "../models/comment.model.js"
import userModel from "../models/user.model.js"

export const addComment = async (req, res, next) => {
  try {
    const { user, blogid, comment } = req.body
    const newComment = await commentModel.create({
      user: user,
      blogid: blogid,
      comment: comment,
    })
    res.status(200).json({
      success: true,
      message: "Comment added",
      comment: newComment
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getComments = async (req, res, next) => {
  try {
    const { blogid } = req.params
    const comments = await commentModel.find({ blogid }).populate('user', 'name avatar').sort({ createdAt: -1 }).lean().exec()
    res.status(200).json({
      comments
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const commentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params
    const commentCount = await commentModel.countDocuments({ blogid })
    res.status(200).json({
      commentCount
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getAllComments = async (req, res, next) => {
  try {
    const decodedUser = req.user
    const user = await userModel.findById(decodedUser.id)
    let comments
    if (user.role === 'admin') {
      comments = await commentModel.find().populate('blogid', 'title').populate('user', 'name').sort({createdAt: -1})
    } else {
      comments = await commentModel.find({user: user._id}).populate('blogid', 'title').populate('user', 'name').sort({createdAt: -1})
    }
    res.status(200).json({
      comments
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const { commentid } = req.params
    await commentModel.findByIdAndDelete(commentid)
    res.status(200).json({
      success: true,
      message: "Comment deleted"
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}