// backend/src/routes/certifications.js
import express from 'express';
import { getAllCertifications } from '../controllers/certificationController.js';

const router = express.Router();

router.get('/', getAllCertifications);

export default router;