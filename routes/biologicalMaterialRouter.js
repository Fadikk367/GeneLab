import express from 'express';
import { biologicalMaterialController } from '../controllers/index.js';

const router = express.Router();

router.get('/', biologicalMaterialController.getAllMaterials);
router.post('/', biologicalMaterialController.createMaterial);
router.patch('/:materialId', biologicalMaterialController.updateMaterial);
router.delete('/:materialId', biologicalMaterialController.deleteMaterial);

export default router;