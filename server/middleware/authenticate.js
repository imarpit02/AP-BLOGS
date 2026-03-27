import jwt from 'jsonwebtoken'
import { handleError } from "../src/helpers/handleErrors.js"
import config from '../src/config/config.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return next(handleError(403, "Unauthorized access"))
    }
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    req.user = decodedToken
    next()
  } catch (error) {
    return next(handleError(401, "Invalid or expired token"))
  }
}