import { Router } from 'express';
import * as photoController from '../controllers/photoController';
import * as commentController from '../controllers/commentController';
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

router.get('/stats', authenticateToken, photoController.getStats);
router.get('/:id', photoController.getPhotoById);
router.get('/', photoController.getPhotos);
router.delete('/:id', authenticateToken, photoController.deletePhoto);
router.post('/', authenticateToken, upload.any(), photoController.create);
router.post('/:id/comment', authenticateToken, commentController.create);
router.post(
  '/upload',
  authenticateToken,
  express.raw({ type: 'image/jpeg', limit: '10mb' }),
  upload.any(),
  photoController.uploadPhoto
);

export default router;
