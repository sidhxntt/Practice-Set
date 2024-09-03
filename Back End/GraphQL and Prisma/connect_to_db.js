import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
}

export default connectToDatabase;
