import { Router } from 'express';
import * as photoController from '../controllers/photoController';

const router = Router();

router.get('/photos', photoController.getAllPhotos);
router.get('/photos/:id', photoController.getPhotoById);
router.post('/photos', photoController.createPhoto);

export default router;
