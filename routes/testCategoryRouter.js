import express from 'express';
import { testCategoryController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testCategoryController.getAllCategories);
router.post('/', testCategoryController.createCategory);
router.patch('/:categoryId', testCategoryController.updateCategory);
router.delete('/:categoryId', testCategoryController.deleteCategory);

export default router;