import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import dotenv from 'dotenv';
import { createContext } from 'vm';

dotenv.config();

const port = 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const UsersController = {
//   getOwnUser: async (ctx: Koa.Context): Promise<void> => {
//     ctx.respond = false;
//     ctx.res.statusCode = 200;
//   },
//   createUser: async (ctx: Koa.Context): Promise<void> => {
//     ctx.respond = false;
//     ctx.res.statusCode = 200;
//   },
// };

const handleRequest = async (ctx: Koa.Context): Promise<void> => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};

void app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  // router.get('/users', UsersController.getOwnUser);
  // router.post('/users', UsersController.createUser);

  router.post('/test', async (ctx) => {
    console.log('working');
    ctx.response.message = 'hi';
  });

  server.use(router.routes()).use(router.allowedMethods());

  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
