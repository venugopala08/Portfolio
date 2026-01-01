// backend/src/routes/chat.js
import express from 'express';
import { chatWithAI } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', chatWithAI);

export default router;