import asyncHandler from '../../common/utils/asyncHandler.js';
import { loginAdmin } from './auth.service.js';

export const login = asyncHandler(async (req, res) => {
  const result = await loginAdmin(req.validated.body.email, req.validated.body.password);
  res.json({ success: true, data: result });
});

export function me(req, res) {
  res.json({ success: true, data: req.admin });
}
