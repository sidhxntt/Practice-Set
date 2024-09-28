import { Request, Response, NextFunction } from "express";
import rc from "./redis_client";

async function getone(
    Prisma_model: any,
    idParam: string,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const id = parseInt(req.params[idParam], 10); 

    try {
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid image ID" });
        }

        const cacheKey = `images:${id}`;
        const cachedData = await rc.get(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const data = await Prisma_model.findUnique({
            where: { id: id },
        });

        if (!data) {
            return res.status(404).json({ error: "Image not found" });
        }

        await rc.setex(cacheKey, 60, JSON.stringify(data)); // Cache for 1 minute
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching image:", error);
        next(error); // Pass error to the next middleware
    }
}

export default getone;