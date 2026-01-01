// backend/src/controllers/certificationController.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from '../utils/appError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export async function getAllCertifications(req, res, next) {
  try {
    const certsPath = path.join(__dirname, '../data/certifications.json');
    const certifications = await readJson(certsPath);

    if (!Array.isArray(certifications)) {
      return next(new AppError('Certifications data is not an array', 500));
    }

    return res.status(200).json({
      status: 'success',
      results: certifications.length,
      data: certifications,
    });
  } catch (err) {
    return next(err);
  }
}