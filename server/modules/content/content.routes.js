import { Router } from 'express';
import authenticate from '../../common/middleware/authenticate.js';
import validate from '../../common/middleware/validate.js';
import { get, update } from './content.controller.js';
import { updateContentSchema } from './content.validation.js';

const router = Router();

router.get('/', get);
router.put('/', authenticate, validate(updateContentSchema), update);

export default router;
