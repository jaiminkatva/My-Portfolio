import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 140 },
    shortTitle: { type: String, default: '', trim: true, maxlength: 100 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    description: { type: String, default: '', trim: true, maxlength: 3000 },
    technologies: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    responsibilities: [{ type: String, trim: true }],
    modules: [{ type: String, trim: true }],
    usp: {
      title: { type: String, default: '', trim: true, maxlength: 200 },
      body: { type: String, default: '', trim: true, maxlength: 1000 },
    },
    caseStudy: {
      problem: { type: String, default: '' },
      architecture: { type: String, default: '' },
      challenge: { type: String, default: '' },
      solution: { type: String, default: '' },
      outcome: { type: String, default: '' },
      workflow: [{ type: String, trim: true }],
    },
    projectUrl: { type: String, default: '' },
    repositoryUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
