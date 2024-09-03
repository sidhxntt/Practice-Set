import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const sid = await prisma.user.create({
    data: {
      username: 'siddhxnt',
      email: 'siddhantg2002@gmail.com',
      password: await bcrypt.hash('password1',10),
      profile: {
        create: {
          name: 'Siddhant Gupta',
          gender: 'Male',
          age: '22',
        },
      },
      posts: {
        create: [
          {
            title: 'Siddhant First Post',
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
            title: 'Siddhant Second Post',
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
  const pri = await prisma.user.create({
    data: {
      username: 'pandu_pri',
      email: 'priyanka_mishra@example.com',
      password: await bcrypt.hash('password2',10),
      profile: {
        create: {
          name: 'Priyanka Mishra',
          gender: 'Female',
          age: '22',
        },
      },
      posts: {
        create: [
          {
            title: 'Pri first Post',
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
            title: 'Pri Second Post',
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
  const shashank = await prisma.user.create({
    data: {
      username: 'shashank',
      email: 'shashank@example.com',
      password: await bcrypt.hash('password3',10),
      profile: {
        create: {
          name: 'Shashank Bhatele',
          gender: 'Male',
          age: '30',
        },
      },
      posts: {
        create: [
          {
            title: 'Shashank first Post',
            content: 'This is the content of the first post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'bakchodi',
                    },
                  },
                },
                {
                  tag: {
                    create: {
                      type: 'more bakchodi',
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'Shashank Second Post',
            content: 'This is the content of the second post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'abhi bhi bakchodi',
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
  const puru = await prisma.user.create({
    data: {
      username: 'puru',
      email: 'puru@example.com',
      password: await bcrypt.hash('password4',10),
      profile: {
        create: {
          name: 'Prakul Sharma',
          gender: 'Male',
          age: '50',
        },
      },
      posts: {
        create: [
          {
            title: 'prakul first Post',
            content: 'This is the content of the first post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'coffee',
                    },
                  },
                },
                {
                  tag: {
                    create: {
                      type: 'more coffee',
                    },
                  },
                },
              ],
            },
          },
          {
            title: 'puru Second Post',
            content: 'This is the content of the second post.',
            tags: {
              create: [
                {
                  tag: {
                    create: {
                      type: 'abhi bhi coffee',
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
