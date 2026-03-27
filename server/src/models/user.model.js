import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true})

const userModel = mongoose.model('user', userSchema)

export default userModel