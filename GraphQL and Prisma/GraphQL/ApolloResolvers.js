import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    books: async () => {
      return prisma.book.findMany();
    },
    book: async (_, { id }) => {
      return prisma.book.findUnique({
        where: { id }
      });
    },
    authors: async () => {
      return prisma.author.findMany();
    },
    author: async (_, { id }) => {
      return prisma.author.findUnique({
        where: { id }
      });
    }
  },
  Mutation: {
    createBook: async (_, { title, authorName, price, quantity, reviews }) => {
      return prisma.book.create({
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] }
        }
      });
    },
    updateBook: async (_, { id, title, authorName, price, quantity, reviews }) => {
      return prisma.book.update({
        where: { id },
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] }
        }
      });
    },
    deleteBook: async (_, { id }) => {
      try {
        await prisma.book.delete({
          where: { id }
        });
        return true; // Deletion successful
      } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error);
        return false; // Deletion failed
      }
    },
    createAuthor: async (_, { name, age, gender }) => {
      return prisma.author.create({
        data: {
          name,
          age,
          gender
        }
      });
    },
    updateAuthor: async (_, { id, name, age, gender }) => {
      return prisma.author.update({
        where: { id },
        data: {
          name,
          age,
          gender
        }
      });
    },
    deleteAuthor: async (_, { id }) => {
      try {
        await prisma.author.delete({
          where: { id }
        });
        return true; // Deletion successful
      } catch (error) {
        console.error(`Error deleting author with ID ${id}:`, error);
        return false; // Deletion failed
      }
    }
  }
};

export default resolvers;
