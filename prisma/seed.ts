// prisma/seed.ts
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = await bcrypt.hash("123456", 10); // เข้ารหัสรหัสผ่าน

  if (process.env.NODE_ENV !== "production") {
    await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        name: "Admin",
        password,
      },
    });
  }

  console.log("✅ Seed complete! User: admin@example.com / 123456");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
