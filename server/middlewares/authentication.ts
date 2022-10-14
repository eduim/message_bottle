import Koa from 'koa';
import { JWT_SECRET } from '../lib/constants';
import jwt from 'jsonwebtoken';

const authMiddleware: Koa.Middleware = async function (
  ctx: Koa.Context,
  next: Koa.Next
) {
  const token = ctx.headers.authorization?.split('Bearer ')[1];
  if (token === undefined) {
    ctx.res.statusCode = 401;
    return;
  }
  const secret = JWT_SECRET;

  ctx.user = jwt.verify(token, secret);
  await next();
};

export default authMiddleware;
