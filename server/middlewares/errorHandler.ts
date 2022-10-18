import Koa from 'koa';

const errorMiddleware: Koa.Middleware = async function (
  ctx: Koa.Context,
  next: Koa.Next
) {
  try {
    await next();
  } catch (err: any) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
};

export default errorMiddleware;
