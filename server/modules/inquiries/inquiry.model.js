import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    company: { type: String, default: '', trim: true, maxlength: 120 },
    service: { type: String, default: '', trim: true, maxlength: 100 },
    budget: { type: String, default: '', trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new', index: true },
    notes: { type: String, default: '', maxlength: 2000 },
  },
  { timestamps: true },
);

export default mongoose.model('Inquiry', inquirySchema);
