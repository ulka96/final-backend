import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
  videoUrl: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Blog', blogSchema);
