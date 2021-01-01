import express from 'express';
import { employeeControler } from '../controllers/index.js';

const router = express.Router();

router.get('/', employeeControler.getAllEmployees);
router.post('/', employeeControler.createEmployee);
router.delete('/:employeeId', employeeControler.deleteEmployee);

export default router;