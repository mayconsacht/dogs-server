import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/login', userController.getUser);

export default router;
