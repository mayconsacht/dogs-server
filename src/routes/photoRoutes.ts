import { Router } from 'express';
import * as photoController from '../controllers/photoController';

const router = Router();

router.get('/api/photo', photoController.getPhotoById);

export default router;
