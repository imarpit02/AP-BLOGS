import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"
import { handleError } from "../helpers/handleErrors.js"
import config from "../config/config.js"

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const isUserAlreadyexists = await userModel.findOne({ email })
    if (isUserAlreadyexists) {
      return next(handleError(409, 'User already exists.'))
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({
      name,
      email, 
      password: hashedPassword
    })
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    })
  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const loginUser = async (req, res, next) => {
  try {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return next(handleError(401, 'Invalid credentials.'))
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return next(handleError(401, 'Invalid credentials.'))
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    const secureUser = user.toObject({ getters: true })
    delete secureUser.password

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      user: secureUser
    })

  } catch (error) {
    return next(handleError(500, error.message))
  }
}


export const googleLogin = async (req, res, next) => {
  try {

    const { name, email, avatar } = req.body

    let user
    user = await userModel.findOne({ email })

    if (!user) {
      const password = Math.random().toString()
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        avatar
      })
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    const secureUser = user.toObject({ getters: true })
    delete secureUser.password

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: secureUser
    })

  } catch (error) {
    return next(handleError(500, error.message))
  }
}

export const logoutUser = async (req, res, next) => {
  try {

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
    })

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    })

  } catch (error) {
    return next(handleError(500, error.message))
  }
}