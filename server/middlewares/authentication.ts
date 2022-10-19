import Koa from 'koa';
import { JWT_SECRET } from '../lib/constants';
import jwt from 'jsonwebtoken';

const authMiddleware: Koa.Middleware = async function (
  ctx: Koa.Context,
  next: Koa.Next
) {
  const token = ctx.headers.authorization?.split('Bearer ')[1];
  if (token === undefined) {
    ctx.throw(401, "You're not logged in.");
  }
  const secret = JWT_SECRET;

  try {
    const token = ctx.headers.authorization?.split('Bearer ')[1];
    if (token === undefined) {
      throw new Error('No token provided in the Authorization header');
    }
    const secret = JWT_SECRET;
    ctx.user = jwt.verify(token, secret);
    await next();
  } catch (e) {
    console.error(e);
    ctx.throw(401, "You're not logged in.");
  }
};

export default authMiddleware;
