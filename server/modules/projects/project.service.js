import AppError from '../../common/errors/AppError.js';
import Project from './project.model.js';

export function listPublishedProjects({ featuredOnly = false } = {}) {
  return Project.find({ published: true, ...(featuredOnly ? { featured: true } : {}) }).sort({ displayOrder: 1, createdAt: -1 });
}

export function listAllProjects() {
  return Project.find().sort({ displayOrder: 1, createdAt: -1 });
}

export async function findPublishedProject(slug) {
  const project = await Project.findOne({ slug, published: true });
  if (!project) throw new AppError(404, 'Project not found');
  return project;
}

export function createProject(data) {
  return Project.create(data);
}

export async function updateProject(id, data) {
  const project = await Project.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
  if (!project) throw new AppError(404, 'Project not found');
  return project;
}

export async function deleteProject(id) {
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new AppError(404, 'Project not found');
}
