import { Request, Response, NextFunction } from "express";

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


async function post_user(req: Request, res: Response, next: NextFunction, model: any){
    try {
        const { name, username, email, address, phone, website } = req.body as UserInput;
       // Validate input
       if (!name || !username || !email || !address) {
        return res.status(400).json({ error: "Missing required fields" });
      }
        // Check if a user with the same email or username already exists
        const existingUser = await model.findFirst({
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
        const User = await model.create({
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
}


export default post_user