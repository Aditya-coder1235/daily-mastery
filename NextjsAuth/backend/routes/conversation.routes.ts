import express from 'express';
const router = express.Router();
import { startConversation } from '../controllers/conversation.controller';
import isAuth from '../middleware/isAuth';

router.post('/start', isAuth, startConversation);

export default router;