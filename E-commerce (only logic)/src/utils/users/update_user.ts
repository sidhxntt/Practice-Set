import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

async function update_user(
  req: Request,
  res: Response,
  next: NextFunction,
  model: any
) {
  try {
    const data: User = req.body;
    const { id } = req.params;
    const { name, phone_number, password } = data;

    if(!id ){
      res.status(400).json({
        error: "Product ID is required",
      })
    }

    const existingUser = await model.findUnique({
    where: { id: parseInt(id, 10) },
    });

    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Product not found" });
    }
    const updated_user = await model.update({
        where: { id: parseInt(id, 10) },
        data:{
            name,
            password,
            phone_number
        }
    })
    console.log("User Updated");
    res.status(200).json({ message: "User added successfully", updated_user });
  } catch (error) {
    next(error);
  }
}

export default update_user;
