import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  blogid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'blog'
  },
}, { timestamps: true })

const likeModel = mongoose.model('like', likeSchema)

export default likeModel