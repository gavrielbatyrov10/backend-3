const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.upsert({
      where: { email: `loch${i}@loch.com` },
      update: {},
      create: {
        email: `loch${i}@loch.com`,
        // Add name or other fields if needed
      },
    });

    await prisma.task.create({
      data: {
        title: `Task title ${i}`,
        userId: user.id, // Associate the task with the user
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
