import express from 'express';
import { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/', addBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
