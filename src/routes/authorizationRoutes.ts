import { Router } from 'express';
import * as authorizationController from '../controllers/authorizationController';

const router = Router();

router.post('/validate', authorizationController.validateToken);
router.post('/', authorizationController.login);

export default router;
