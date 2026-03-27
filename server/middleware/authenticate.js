import jwt from 'jsonwebtoken'
import { handleError } from "../src/helpers/handleErrors.js"
import config from '../src/config/config.js'
import userModel from '../src/models/user.model.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return next(handleError(403, "Unauthorized access"))
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    const user = await userModel.findById(decodedToken.id).select('_id role')
    if (!user) {
      return next(handleError(401, "Invalid or expired token"))
    }
    req.user = {
      id: user._id,
      role: user.role,
    }
    next()
  } catch (error) {
    return next(handleError(401, "Invalid or expired token"))
  }
}