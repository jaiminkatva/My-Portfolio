import AppError from '../../common/errors/AppError.js';
import asyncHandler from '../../common/utils/asyncHandler.js';
import Inquiry from './inquiry.model.js';

export const submit = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.create(req.validated.body);
  res.status(201).json({ success: true, data: { id: inquiry.id }, message: 'Enquiry received' });
});

export const list = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: inquiries });
});

export const update = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.validated.params.id, req.validated.body, {
    returnDocument: 'after',
    runValidators: true,
  });
  if (!inquiry) throw new AppError(404, 'Enquiry not found');
  res.json({ success: true, data: inquiry });
});
