import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().transform((value) => value.toLowerCase()),
    company: z.string().trim().max(120).optional(),
    service: z.string().trim().max(100).optional(),
    budget: z.string().trim().max(80).optional(),
    message: z.string().trim().min(10).max(3000),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const updateInquirySchema = z.object({
  body: z.object({
    status: z.enum(['new', 'read', 'replied', 'archived']).optional(),
    notes: z.string().max(2000).optional(),
  }).refine((value) => Object.keys(value).length > 0, 'At least one field is required'),
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid inquiry id') }),
  query: z.object({}),
});
