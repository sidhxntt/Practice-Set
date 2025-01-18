import { PrismaClient } from "@prisma/client";

class Database {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); 
  }

  // Method to connect to the database
  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect(); 
      console.log("Successfully connected to database 🎯");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error connecting to database:", error.message);
      } else {
        console.error("An unknown error occurred while connecting to the database.");
      }
    }
  }

  // Method to disconnect from the database
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect(); 
      console.log("Disconnected from database 🃏");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error disconnecting from database:", error.message);
      } else {
        console.error("An unknown error occurred while disconnecting from the database.");
      }
    }
  }
}


const database = new Database();
export default database;