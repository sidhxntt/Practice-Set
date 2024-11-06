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


async function patch_user(req: Request, res: Response, next: NextFunction, model: any, id: string){
    const userID: string = req.params[id];

  try {
    const parsedUserID = parseInt(userID, 10);
    const { name, username, email, address, phone, website } = req.body as UserInput;

    if (isNaN(parsedUserID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await model.update({
      where: {
        id: parsedUserID,
      },
      data: {
        name,
        username,
        email,
        phone,
        website,
        address: {
          upsert: {
            create: {
              street: address?.street,
              suite: address?.suite,
              city: address?.city,
              zipcode: address?.zipcode,
            },
            update: {
              street: address?.street,
              suite: address?.suite,
              city: address?.city,
              zipcode: address?.zipcode,
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: user,
      user_address: address,
    });
  } catch (error) {
    next(error);
  }
}


export default patch_user;