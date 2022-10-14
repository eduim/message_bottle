import Koa, { Next } from 'koa';
import Router from 'koa-router';
import next from 'next';
import bodyParser from 'koa-body';
import UsersController from './controllers/Users.controller';
import authMiddleware from './middlewares/authentication';
import { Server } from 'http';

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
  const router = new Router();

  server.use(bodyParser());

  router.get('/login/github', UsersController.requestAuthorization);
  router.get('/login/github/callback', UsersController.getAuthorization);
  router.get('/me', authMiddleware, UsersController.authentication);
  server.use(router.routes()).use(router.allowedMethods());

  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
