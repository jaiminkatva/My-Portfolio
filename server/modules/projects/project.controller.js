import asyncHandler from '../../common/utils/asyncHandler.js';
import * as projectService from './project.service.js';

export const listPublic = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await projectService.listPublishedProjects({ featuredOnly: req.query.featured === 'true' }) });
});

export const getPublic = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await projectService.findPublishedProject(req.params.slug) });
});

export const listAdmin = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await projectService.listAllProjects() });
});

export const create = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.validated.body);
  res.status(201).json({ success: true, data: project });
});

export const update = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.validated.params.id, req.validated.body);
  res.json({ success: true, data: project });
});

export const remove = asyncHandler(async (req, res) => {
  await projectService.deleteProject(req.validated.params.id);
  res.status(204).send();
});
