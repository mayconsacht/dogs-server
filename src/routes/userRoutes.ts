import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middleware/routeGuard';

const router = Router();

router.get('/', authenticateToken, userController.getUser);
router.post('/', userController.createUser);

export default router;
