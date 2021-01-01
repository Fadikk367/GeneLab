import express from 'express';
import { employeePositionController } from '../controllers/index.js';

const router = express.Router();

router.get('/', employeePositionController.getAllEmployeePositions);
router.post('/', employeePositionController.createEmployeePosition);
router.patch('/:positionId', employeePositionController.updateEmployeePosition);
router.delete('/:positionId', employeePositionController.deleteEmployeePosition);

export default router;