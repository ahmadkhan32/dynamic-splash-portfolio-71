import { Router } from 'express';
import { sendContactMessage, getContactMessages, markAsRead } from '../controllers/contactController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', sendContactMessage);
router.get('/', authMiddleware, getContactMessages);
router.patch('/:id/read', authMiddleware, markAsRead);

export default router;
