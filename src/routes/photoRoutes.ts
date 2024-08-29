import { Router } from 'express';
import * as photoController from '../controllers/photoController';
import { authenticateToken } from '../middleware/routeGuard';

const router = Router();

router.get('/:id', authenticateToken, photoController.getPhotoById);
router.get('/', photoController.getPhotos);
router.post('/', authenticateToken, photoController.create);

export default router;
