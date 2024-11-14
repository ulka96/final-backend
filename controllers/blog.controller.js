import Blog from '../models/blog.model.js';

// Add a new blog post
// controllers/blog.controller.js
export const addBlog = async (req, res) => {
    try {
      console.log("Received request body:", req.body); // Log the incoming request body
  
      const { title, content, image, videoUrl } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
      }
  
      const newBlog = new Blog({
        title,
        content,
        image,
        videoUrl,
      });
  
      await newBlog.save();
  
      res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Failed to create blog", error });
    }
  };
  
  

// Get all blog posts
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve blogs', error });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve blog', error });
  }
};

// Update a blog post by ID
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error });
  }
};

// Delete a blog post by ID
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error });
  }
};
