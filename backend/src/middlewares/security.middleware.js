import rateLimit from "express-rate-limit";
import helmet from 'helmet';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // limit each IP to 100 requests per windowMs
});

export const securityMiddleware = [
  helmet(),
  helmet.crossOriginResourcePolicy({ policy: "cross-origin" }),
  helmet.noSniff(),
  helmet.xssFilter(),
  helmet.hidePoweredBy()
];

