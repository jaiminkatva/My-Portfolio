import SiteContent from './content.model.js';

export async function getSiteContent() {
  const record = await SiteContent.findOne({ key: 'portfolio' }).lean();
  return record?.data || null;
}

export async function saveSiteContent(data, adminId) {
  const record = await SiteContent.findOneAndUpdate(
    { key: 'portfolio' },
    { $set: { data, updatedBy: adminId } },
    { upsert: true, returnDocument: 'after', runValidators: true },
  );
  return record.data;
}
