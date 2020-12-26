import express from 'express';
import { diagnosticLaboratoryController } from '../controllers/index.js';

const router = express.Router();

router.get('/', diagnosticLaboratoryController.getAllLaboratories);
router.post('/', diagnosticLaboratoryController.createLaboratory);
router.patch('/:laboratoryId', diagnosticLaboratoryController.updateLaboratory);
router.delete('/:laboratoryId', diagnosticLaboratoryController.deleteLaboratory);

export default router;