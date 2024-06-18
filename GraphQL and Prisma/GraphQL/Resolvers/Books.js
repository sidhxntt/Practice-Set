import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const BookResolvers = {
  Query: {
    getAllbooks: async () => {
      return prisma.book.findMany();
    },
    getPaginatedBooks: async (_, { page, limit }) => {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const books = await prisma.book.findMany();

      const results = {
        total: page * limit,
        Current_limt: limit,
        current_Page: page,
        next_Page: page + 1,
        previous_Page: page - 1,
        results: books.slice(startIndex, endIndex),
      };

      return results;
    },
    getOnebook: async (_, { id }) => {
      return prisma.book.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    createBook: async (_, { title, authorName, price, quantity, reviews }) => {
      return prisma.book.create({
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] },
        },
      });
    },
    updateBook: async ( _,{ id, title, authorName, price, quantity, reviews }) => {
      return prisma.book.update({
        where: { id },
        data: {
          title,
          author: authorName,
          price,
          quantity,
          reviews: { set: reviews || [] },
        },
      });
    },
    deleteBook: async (_, { id }) => {
      try {
        await prisma.book.delete({
          where: { id },
        });
        return true; // Deletion successful
      } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error);
        return false; // Deletion failed
      }
    },
  },
};

export default BookResolvers;
