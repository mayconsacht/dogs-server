import { Router } from 'express';
import * as photoController from '../controllers/photoController';
import { authenticateToken } from '../middleware/routeGuard';

const router = Router();

router.get('/:id', photoController.getPhotoById);
router.get('/', photoController.getPhotos);

export default router;
