import { Request, Response, NextFunction } from "express";

async function delete_user(req: Request, res: Response, next: NextFunction, model1: any, model2: any, id: string){
    const userID: string = req.params[id];

    try {
      const parsedUserID = parseInt(userID, 10);
  
      if (isNaN(parsedUserID)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await model1.findUnique({
        where: {
          id: parsedUserID,
        },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Delete related addresses
      await model2.deleteMany({
        where: { userID: parsedUserID },
      });
  
      // Now delete the user
      await model1.delete({
        where: { id: parsedUserID },
      });
  
      return res.status(200).json({ message: "User & its address deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

export default delete_user