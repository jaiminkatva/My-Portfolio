import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import AppError from '../../common/errors/AppError.js';
import Admin from './admin.model.js';

export async function loginAdmin(email, password) {
  const admin = await Admin.findOne({ email }).select('+passwordHash');
  if (!admin || !admin.isActive || !(await bcrypt.compare(password, admin.passwordHash))) {
    throw new AppError(401, 'Invalid email or password');
  }

  admin.lastLoginAt = new Date();
  await admin.save();
  const token = jwt.sign({ sub: admin.id, role: admin.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  return {
    token,
    admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  };
}
