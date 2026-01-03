import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from '../utils/appError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioPath = path.join(__dirname, '../data/portfolio.json');

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function writeJson(filePath, data) {
  const raw = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, raw, 'utf8');
}

export async function getPortfolio(req, res, next) {
  try {
    const portfolio = await readJson(portfolioPath);

    return res.status(200).json({
      status: 'success',
      data: portfolio,
    });
  } catch (err) {
    if (err?.code === 'ENOENT') {
      return res.status(200).json({
        status: 'success',
        data: {},
      });
    }
    return next(err);
  }
}

export async function updatePortfolio(req, res, next) {
  try {
    const { data } = req.body || {};

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return next(new AppError('Field "data" must be an object', 400));
    }

    await writeJson(portfolioPath, data);

    return res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    return next(err);
  }
}
