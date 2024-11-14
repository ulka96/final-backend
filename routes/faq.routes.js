import express from 'express'

import {createFaq, getFaq, updateFaq, deleteFaq} from "../controllers/faq.controller.js"

const router = express.Router();

router.post('/', createFaq)
router.get('/', getFaq)
router.patch('/:id', updateFaq)
router.delete('/:id', deleteFaq)

export default router