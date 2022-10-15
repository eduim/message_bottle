import dotenv from 'dotenv';
dotenv.config();

if (process.env.JWT_SECRET === undefined) {
  throw new Error('missing JWS secret');
}

const JWT_SECRET: string = process.env.JWT_SECRET;

if (process.env.GITHUB_CLIENT_ID === undefined) {
  throw new Error('missing github client id');
}

const GITHUB_CLIENT_ID: string = process.env.GITHUB_CLIENT_ID;

if (process.env.GITHUB_CLIENT_SECRET === undefined) {
  throw new Error('missing github secret');
}

const GITHUB_CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET;

export { JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET };
