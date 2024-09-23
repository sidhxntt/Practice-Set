import { Request, Response, NextFunction } from "express";
import rc from "./redis_client";

async function Getall(
  Prisma_model: any, 
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    // Create a cache key based on the pagination parameters
    const cacheKey = `${Prisma_model.name}:${page}:${limit}`;

    // Try to get data from Redis cache
    const cachedData = await rc.get(cacheKey);

    if (cachedData) {
      try {
        // If data is in cache, parse and return it
        const parsedData = JSON.parse(cachedData);
        return res.status(200).json(parsedData);
      } catch (parseError) {
        console.error("Error parsing cached data:", parseError);
        // If parsing fails, proceed to fetch fresh data
      }
    }

    // Fetch data and total count from the database concurrently
    const [data, total] = await Promise.all([
      Prisma_model.findMany({
        skip: offset,
        take: limit,
      }),
      Prisma_model.count(),
    ]);

    const responseData = {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data,
    };

    // Store the fetched data in Redis
    await rc.setex(cacheKey, 360, JSON.stringify(responseData)); // Cache for 6 minutes
    return res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
}

export default Getall