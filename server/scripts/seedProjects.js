import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { projects } from '../../src/data/content.js';
import Project from '../modules/projects/project.model.js';

function toProject(project, index) {
  return {
    slug: project.id,
    title: project.fullTitle,
    shortTitle: project.name,
    category: project.category,
    summary: project.summary,
    description: project.description,
    technologies: project.allTags,
    tags: project.tags,
    responsibilities: project.role,
    modules: project.modules,
    usp: project.usp,
    caseStudy: project.caseStudy,
    featured: true,
    published: true,
    displayOrder: index + 1,
  };
}

async function seed() {
  await connectDatabase();
  const operations = projects.map((project, index) => ({
    updateOne: {
      filter: { slug: project.id },
      update: { $set: toProject(project, index) },
      upsert: true,
    },
  }));
  const result = await Project.bulkWrite(operations);
  console.log(`Featured work ready: ${projects.length} projects (${result.upsertedCount} created, ${result.modifiedCount} updated)`);
  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error(error.message);
  await disconnectDatabase();
  process.exit(1);
});
