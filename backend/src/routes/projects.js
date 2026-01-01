import express from 'express';
import { getAllProjects } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);

export default router;