import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt"

async function signup_message(
  req: Request,
  res: Response,
  next: NextFunction,
) {
    try {
        res
          .status(200)
          .json({ 
            message: "Signup to Login.",
            instruction: "Provide your username & password to signup in json format in request body."
          });
      } catch (error) {
        next(error);
      }
}

async function signup(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
    try {
         const { email, password, name, phone_number } = req.body;
         if(!email || !password){
          res.status(400).json({error:"email and password are must.", optional: "name & phone_number" })
         }
   
         const existingUser = await model.findUnique({
           where: { email },
         });
         if (existingUser) {
           if (existingUser.email === email) {
             return res.status(400).json({ message: "Username already exists" });
           }
         } else {
           const hashedPassword = await bcrypt.hash(password, 10);
           const user: User = await model.create({
             data: {
               email,
               password: hashedPassword,
               name,
               phone_number
             }
           });
           console.log('User created successfully')
           res.status(201).json({ message: "User created successfully. Login to continue", user });
         }
       } catch (error) {
         next(error);
       }
      }

export {signup_message, signup}