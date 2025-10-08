// Use the Prisma client from the lib directory
import { prisma } from '../src/lib/prisma';

async function main() {
  // Create a test user
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
    },
  });

  // Create a test pregnancy info for the user
  const startDate = new Date();

  // First get the created user to get the userId
  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (user) {
    await prisma.pregnancyInfo.upsert({
      where: { userId: user.id },
      update: {
        startDate: startDate,
      },
      create: {
        userId: user.id,
        startDate: startDate
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
