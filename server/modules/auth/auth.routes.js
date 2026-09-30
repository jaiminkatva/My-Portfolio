import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import authenticate from '../../common/middleware/authenticate.js';
import validate from '../../common/middleware/validate.js';
import { login, me } from './auth.controller.js';
import { loginSchema } from './auth.validation.js';

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8' });

router.post('/login', loginLimiter, validate(loginSchema), login);
router.get('/me', authenticate, me);

export default router;
