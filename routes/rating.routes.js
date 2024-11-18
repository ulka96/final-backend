import express from 'express';
import { addRating, getProductRating } from '../controllers/rating.controller.js';

const router = express.Router();

router.post('/', addRating);  // Submit a new rating
router.get('/:productId', getProductRating);  // Get ratings for a product

export default router;

