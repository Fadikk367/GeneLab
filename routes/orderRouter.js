import express from 'express';
import { orderController } from '../controllers/index.js';

const router = express.Router();

router.post('/', orderController.createOrder);

export default router;