import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
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
})

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel