import { Router } from 'express';
import * as photoController from '../controllers/photoController';

const router = Router();

router.get('/photos/:id', photoController.getPhotoById);

export default router;
