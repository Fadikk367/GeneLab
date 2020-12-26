import express from 'express';
import { testController } from '../controllers/index.js';

const router = express.Router();

router.get('/', testController.getAllTests);
router.get('/names', testController.getAllTestNames);
router.get('/:testId', testController.getTestWithDetails);
router.post('/', testController.createTest);
router.patch('/:testId', testController.updateTest);
router.delete('/:testId', testController.deleteTest);

export default router;