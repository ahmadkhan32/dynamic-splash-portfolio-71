import { Router } from 'express';
import { login, createInitialAdmin } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/create-initial-admin', createInitialAdmin);

export default router;
