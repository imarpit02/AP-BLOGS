import { handleError } from "../helpers/handleErrors.js"
import liketModel from "../models/like.model.js"

export const doLike = async (req, res, next) => {
  try {
    const { user, blogid } = req.body
    let like
    like = await liketModel.findOne({ user, blogid })
    if (!like) {
      const saveLike = new liketModel({
        user,
        blogid
      })
      like = await saveLike.save()
    } else {
      await liketModel.findByIdAndDelete(like._id)
    }
    const likeCount = await liketModel.countDocuments({ blogid })
    res.status(200).json({
      likeCount
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const likeCount = async (req, res, next) => {
  try {
    const { blogid } = req.params
    const { userid } = req.query
    const likeCount = await liketModel.countDocuments({ blogid })

    let isUserLiked = false
    if (userid) {
      const getUserLike = await liketModel.countDocuments({ blogid, user: userid })
      if (getUserLike > 0) {     
        isUserLiked = true
      }
    }
    res.status(200).json({
      likeCount,
      isUserLiked,
    })
    } catch (error) {
    return next(handleError(500, error.message))
  }
}
