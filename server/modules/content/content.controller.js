import asyncHandler from '../../common/utils/asyncHandler.js';
import { getSiteContent, saveSiteContent } from './content.service.js';

export const get = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await getSiteContent() });
});

export const update = asyncHandler(async (req, res) => {
  const data = await saveSiteContent(req.validated.body, req.admin._id);
  res.json({ success: true, data, message: 'Site content updated' });
});
