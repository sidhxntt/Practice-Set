import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

interface ResponseBody {
  message: string;
  params?: string | number;
}

// Route handler for the root path
router.get("/", async (req: Request, res: Response<ResponseBody>, next: NextFunction): Promise<void> => {
  try {
    const response: ResponseBody = {
      message: "Welcome to Docker Tutorial using ts-node",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Route handler for paths with a dynamic `slug` parameter
router.get(
 "/:slug",
  async (req: Request<{ slug: string }>, res: Response<ResponseBody>, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    try {
      const response: ResponseBody = {
        message: "Welcome to Docker Tutorial using ts-node",
        params: slug,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
