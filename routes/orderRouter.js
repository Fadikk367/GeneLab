import express from 'express';
import { orderController } from '../controllers/index.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/:orderId/status', orderController.checkOrderStatus);
router.get('/:orderId/results', orderController.getOrderResults);

export default router;