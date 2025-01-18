import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redis_connection = async(): Promise<Redis> => {
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  });

  redis.on('connect', () => {
    console.log('Successfully connected to Redis!');
  });

  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  return redis; 
};

export default redis_connection;
