import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category'
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, 
    trim: true
  },
  featuredImage: {
    type: String,
    required: true,
    trim: true
  },
  blogContent: {
    type: String,
    required: true,
    trim: true
  },
},{timestamps: true} )

const blogModel = mongoose.model('blog', blogSchema)

export default blogModel