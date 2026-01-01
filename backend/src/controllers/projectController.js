// backend/src/controllers/projectController.js
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

export async function getAllProjects(req, res, next) {
  try {
    const preferredPath = path.join(__dirname, '../data/projects.json');
    const legacyPath = path.join(__dirname, '../data/project.json');

    let projects;
    try {
      projects = await readJson(preferredPath);
    } catch {
      projects = await readJson(legacyPath);
    }

    if (!Array.isArray(projects)) {
      return next(new AppError('Projects data is not an array', 500));
    }

    return res.status(200).json({
      status: 'success',
      results: projects.length,
      data: projects,
    });
  } catch (err) {
    return next(err);
  }
}