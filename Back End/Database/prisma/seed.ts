import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      profile: {
        create: {
          name: 'John Doe',
          gender: 'Male',
          age: '30',
        },
      },
      posts: {
        create: [
          {
            title: 'John’s First Post',
            content: 'This is the content of the first post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'Technology',
                    },
                  },
                },
                {
                  tag: {
                    create: {
                      type: 'Programming',
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'John’s Second Post',
            content: 'This is the content of the second post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'Health',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'password567899',
      profile: {
        create: {
          name: 'Jane Doe',
          gender: 'Female',
          age: '',
        },
      },
      posts: {
        create: [
          {
            title: 'Jane’s third Post',
            content: 'This is the content of the first post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'Beauty',
                    },
                  },
                },
                {
                  tag: {
                    create: {
                      type: 'Shopping',
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'Jane’s Second Post',
            content: 'This is the content of the second post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'Womanhood',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Database has been seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
