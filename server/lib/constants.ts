import dotenv from 'dotenv';
dotenv.config();

if (process.env.JWT_SECRET === undefined) {
  throw new Error('missing JWS secret');
}

export const JWT_SECRET: string = process.env.JWT_SECRET;
