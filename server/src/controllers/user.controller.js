import { handleError } from "../helpers/handleErrors.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import uploadFile from "../services/imagekit.service.js"

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params
    const user = await userModel.findOne({ _id: userid }).lean().exec()
    if (!user) {
      return next(handleError(404, 'User not found.'))
    }

    // const secureUser = user.toObject({ getters: true })
    // delete secureUser.password

    return res.status(200).json({
      success: true,
      message: 'User data found.',
      user
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const updateUser = async (req, res, next) => {
  try {
    
    const data = JSON.parse(req.body.data)

    const { userid } = req.params

    const user = await userModel.findById(userid)

    if (!user) {
      return next(handleError(404, "User not found"))
    }

    user.name = data.name
    user.email = data.email
    user.bio = data.bio

    if (data.password && data.password.length >= 8) {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      user.password = hashedPassword
    }

    if (req.file) {
      try {
        const result = await uploadFile(req.file.buffer)
        user.avatar = result.url;
      } catch (error) {
        return next(handleError(500, error.message));
      }
    }

    await user.save()

    // const secureUser = user.toObject({ getters: true })
    // delete secureUser.password

    return res.status(200).json({
      success: true,
      message: 'User data updated successfully.',
      user
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    await userModel.findByIdAndDelete(id)
    return res.status(200).json({
      success: true,
      message: "User deleted"
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}