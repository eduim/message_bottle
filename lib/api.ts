// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface Data {
  name: string;
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: 'John Doe' });
}

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const setToken = function (token: string): void {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export { handler };
