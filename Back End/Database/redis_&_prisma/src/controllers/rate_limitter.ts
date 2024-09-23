import rateLimit from "express-rate-limit";

// Rate limiter middleware
const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    message: "Too many requests currently, please try again after 10 minutes",
  },
  headers: true, // Enable rate limit headers
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default rateLimiter;