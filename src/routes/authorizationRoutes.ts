import { Router } from 'express';
import * as authorizationController from '../controllers/authorizationController';

const router = Router();

router.get('/validate', authorizationController.validateToken);

export default router;
