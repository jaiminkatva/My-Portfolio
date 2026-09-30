import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import authenticate from '../../common/middleware/authenticate.js';
import validate from '../../common/middleware/validate.js';
import { list, submit, update } from './inquiry.controller.js';
import { createInquirySchema, updateInquirySchema } from './inquiry.validation.js';

const router = Router();
const submitLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-8' });

router.post('/', submitLimiter, validate(createInquirySchema), submit);
router.get('/', authenticate, list);
router.patch('/:id', authenticate, validate(updateInquirySchema), update);

export default router;
