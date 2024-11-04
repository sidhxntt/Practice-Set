import express, { Request, Response, NextFunction } from "express";
import decryptJWT from "../controllers/decryption";
import prisma from "../prisma/prisma"

interface UserInput {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
}
const router = express.Router();

// Get all users
router.get("/", decryptJWT, async(req: Request, res: Response, next: NextFunction)=>{
  try {
    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch users with pagination
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    // Optionally, get the total count of users
    const totalUsers = await prisma.user.count();

    return res.status(200).json({
      meta: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
      data: users,

    });
  } catch (error: unknown) {
    next(error)
  }
}) 
// post user
router.post("/", decryptJWT, async(req: Request, res:Response, next: NextFunction)=>{
  try {
    const { name, username, email, address, phone, website } = req.body as UserInput;
   // Validate input
   if (!name || !username || !email || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }
    // Check if a user with the same email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json(
        { error: "This User already exists" }
      );
    }

    // Create a new user along with the address
    const User = await prisma.user.create({
      data: {
        name,
        username,
        email,
        phone,
        website,
        address: {
          create: {
            street: address.street,
            suite: address.suite,
            city: address.city,
            zipcode: address.zipcode,
          },
        },
      },
    });

    return res.status(201).json({ message: "User & its related address created successfully", user: User, user_address: address });
  } catch (error) {
    next(error)
  }
})

router.get("/:userID", decryptJWT , async(req: Request, res:Response, next: NextFunction)=>{
  const userID: string | number = req.params.userID;
  try {

    if (isNaN(userID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userID,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(202).json(user);
  } catch (error) {
    next(error)
  }
})


