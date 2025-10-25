import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL!,
  DIRECT_URL: process.env.DIRECT_URL!,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  JWT_SECRET: process.env.JWT_SECRET!,
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD!,
  SEED_REFRESH_TOKEN: process.env.SEED_REFRESH_TOKEN!,
};
