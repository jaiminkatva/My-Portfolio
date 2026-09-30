import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import AppError from '../errors/AppError.js';
import Admin from '../../modules/auth/admin.model.js';
import asyncHandler from '../utils/asyncHandler.js';

export default asyncHandler(async (req, _res, next) => {
  const authorization = req.get('authorization');
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
  if (!token) throw new AppError(401, 'Authentication required');

  let payload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET);
  } catch {
    throw new AppError(401, 'Invalid or expired token');
  }

  const admin = await Admin.findById(payload.sub).select('-passwordHash');
  if (!admin || !admin.isActive) throw new AppError(401, 'Admin account is unavailable');
  req.admin = admin;
  next();
});
