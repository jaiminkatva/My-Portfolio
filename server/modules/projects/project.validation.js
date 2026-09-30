import { z } from 'zod';

const slug = z.string()
  .trim()
  .toLowerCase()
  .min(2, 'Slug must contain at least 2 characters')
  .max(100, 'Slug must contain at most 100 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug may contain only lowercase letters, numbers, and single hyphens');
const urlOrEmpty = z.union([z.string().url(), z.literal('')]).optional();
const caseStudy = z.object({
  problem: z.string().max(3000).optional(),
  architecture: z.string().max(3000).optional(),
  challenge: z.string().max(3000).optional(),
  solution: z.string().max(3000).optional(),
  outcome: z.string().max(3000).optional(),
  workflow: z.array(z.string().min(1).max(250)).max(20).optional(),
}).optional();

const fields = {
  slug,
  title: z.string().min(2).max(140),
  shortTitle: z.string().max(100).optional(),
  category: z.string().min(2).max(80),
  summary: z.string().min(10).max(500),
  description: z.string().max(3000).optional(),
  technologies: z.array(z.string().min(1).max(60)).max(30).optional(),
  tags: z.array(z.string().min(1).max(60)).max(10).optional(),
  responsibilities: z.array(z.string().min(1).max(120)).max(30).optional(),
  modules: z.array(z.string().min(1).max(120)).max(30).optional(),
  usp: z.object({
    title: z.string().max(200).optional(),
    body: z.string().max(1000).optional(),
  }).optional(),
  caseStudy,
  projectUrl: urlOrEmpty,
  repositoryUrl: urlOrEmpty,
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
};

export const createProjectSchema = z.object({ body: z.object(fields), params: z.object({}), query: z.object({}) });
export const updateProjectSchema = z.object({
  body: z.object(fields).partial().refine((value) => Object.keys(value).length > 0, 'At least one field is required'),
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid project id') }),
  query: z.object({}),
});
export const projectIdSchema = z.object({
  body: z.object({}),
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid project id') }),
  query: z.object({}),
});
