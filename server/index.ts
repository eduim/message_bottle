import Koa from 'koa';
import next from 'next';
import bodyParser from 'koa-bodyparser';
import authRouter from './authRouter';
import router from './router';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, port });
const handle = app.getRequestHandler();

const handleRequest = async (ctx: Koa.Context): Promise<void> => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};

void app.prepare().then(() => {
  const server = new Koa();
  server.use(bodyParser());

  server.use(router.routes()).use(router.allowedMethods());
  server.use(authRouter.routes()).use(router.allowedMethods());
  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
