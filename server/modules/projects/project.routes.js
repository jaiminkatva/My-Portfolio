import { Router } from 'express';
import authenticate from '../../common/middleware/authenticate.js';
import validate from '../../common/middleware/validate.js';
import * as controller from './project.controller.js';
import { createProjectSchema, projectIdSchema, updateProjectSchema } from './project.validation.js';

const router = Router();

router.get('/', controller.listPublic);
router.get('/admin', authenticate, controller.listAdmin);
router.get('/:slug', controller.getPublic);
router.post('/', authenticate, validate(createProjectSchema), controller.create);
router.patch('/:id', authenticate, validate(updateProjectSchema), controller.update);
router.delete('/:id', authenticate, validate(projectIdSchema), controller.remove);

export default router;
