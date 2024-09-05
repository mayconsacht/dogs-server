import { Router } from 'express';
import * as photoController from '../controllers/photoController';
import { authenticateToken } from '../middleware/routeGuard';
import multer from 'multer';
import express from 'express';

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/:id', authenticateToken, photoController.getPhotoById);
router.get('/', photoController.getPhotos);
router.post('/', authenticateToken, upload.any(), photoController.create);
router.post(
  '/upload',
  authenticateToken,
  express.raw({ type: 'image/jpeg', limit: '10mb' }),
  upload.any(),
  photoController.uploadPhoto
);

export default router;
