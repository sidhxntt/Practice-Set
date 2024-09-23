import express, { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";
import Getall from "../utils/Get_all";
import getone from "../utils/Get_One";
import decryptJWT from "../controllers/decryption";
import rateLimiter from "../controllers/rate_limitter";
const router = express.Router();

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

// GET request handler to fetch users with pagination

router.get("/", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  Getall(prisma.user, req, res, next)
});

// POST request handler to create a new user
router.post("/", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email, address, phone, website } = req.body as UserInput;

    // Validate input
    if (!name || !username || !email || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if a user with the same email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "This user already exists" });
    }

    // Create a new user along with the address
    const newUser = await prisma.user.create({
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

    return res.status(201).json({
      message: "User & its related address created successfully",
      user: newUser,
      user_address: address,
    });
  } catch (error) {
   next(error)
  }
});

// GET user by ID
router.get("/:userID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  getone(prisma.user, 'userID', req, res, next)
});

// DELETE user by ID
router.delete("/:userID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = parseInt(req.params.userID, 10);

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

    // Delete related addresses
    await prisma.address.deleteMany({
      where: { userID },
    });

    // Now delete the user
    await prisma.user.delete({
      where: { id: userID },
    });

    return res
      .status(200)
      .json({ message: "User & its address deleted successfully" });
  } catch (error) {
    next(error)
  }
});

// PATCH (update) user by ID
router.patch("/:userID", rateLimiter, decryptJWT, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = parseInt(req.params.userID, 10);

    if (isNaN(userID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { name, username, email, address, phone, website } = req.body as UserInput;

    // Update user and address fields
    const user = await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        name,
        username,
        email,
        phone,
        website,
        address: {
          update: {
            street: address?.street,
            suite: address?.suite,
            city: address?.city,
            zipcode: address?.zipcode,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({
        message: "User updated successfully",
        user: user,
        user_address: address,
      });
  } catch (error) {
   next(error)
  }
});


export default router;