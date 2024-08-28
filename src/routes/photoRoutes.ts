import { Router } from 'express';
import * as photoController from '../controllers/photoController';
import { authenticateToken } from '../middleware/routeGuard';

const router = Router();

router.get('/photo', photoController.getPhotoById);
router.get('/photo/:id', photoController.getPhotoById);
router.get('/photo', photoController.getPhotoById);

export default router;
