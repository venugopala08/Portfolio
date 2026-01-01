// backend/src/controllers/chatController.js
import AppError from '../utils/appError.js';
import { generatePersonaReply } from '../services/aiService.js';

export async function chatWithAI(req, res, next) {
  try {
    const { message, history = [] } = req.body || {};

    if (typeof message !== 'string' || message.trim().length === 0) {
      return next(new AppError('Field "message" is required', 400));
    }

    if (!Array.isArray(history)) {
      return next(new AppError('Field "history" must be an array', 400));
    }

    const reply = await generatePersonaReply({ message, history });

    return res.status(200).json({
      status: 'success',
      reply,
    });
  } catch (err) {
    return next(err);
  }
}