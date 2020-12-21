import express from 'express';
import { testFamiliesController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testFamiliesController.getAllFamilies);
router.post('/', testFamiliesController.createFamily);
router.patch('/:familyId', testFamiliesController.updateFamily);
router.delete('/:familyId', testFamiliesController.deleteFamily);

export default router;