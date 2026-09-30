import "dotenv/config";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDatabase, disconnectDatabase } from "../config/database.js";
import Admin from "../modules/auth/admin.model.js";

const inputSchema = z.object({
  ADMIN_NAME: z.string().min(2).max(80),
  ADMIN_EMAIL: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  ADMIN_PASSWORD: z.string().min(8).max(128),
});

async function seed() {
  const input = inputSchema.parse(process.env);
  await connectDatabase();
  const passwordHash = await bcrypt.hash(input.ADMIN_PASSWORD, 12);
  const existingAdmins = await Admin.find().select('_id email').limit(2);
  const target = existingAdmins.length === 1
    ? { _id: existingAdmins[0]._id }
    : { email: input.ADMIN_EMAIL };
  const admin = await Admin.findOneAndUpdate(
    target,
    { name: input.ADMIN_NAME, email: input.ADMIN_EMAIL, passwordHash, role: "admin", isActive: true },
    { upsert: true, returnDocument: "after", runValidators: true },
  );
  console.log(`Admin ready: ${admin.email}`);
  await disconnectDatabase();
}

seed().catch(async (error) => {
  console.error(error.message);
  await disconnectDatabase();
  process.exit(1);
});
