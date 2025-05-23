require('dotenv').config(); // <== ต้องเพิ่มบรรทัดนี้
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to the database successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
