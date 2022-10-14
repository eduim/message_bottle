import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import dotenv from 'dotenv';
import MoodsController from '../controllers/moods.controller';
import bodyParser from 'koa-bodyparser';
import koabody from 'koa-body';

dotenv.config();

const port = 3000;
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
  server.use(bodyParser({ enableTypes: ['json', 'text'] }));
  // server.use(koabody());
  // server.use((ctx) => {
  //   ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  // });

  // router.get('/users', UsersController.getOwnUser);
  // router.post('/users', UsersController.createUser);

  router.post('/test', async (ctx) => {
    console.log('working');
    ctx.response.message = 'hi';
  });

  router.post('/moods', MoodsController.createMood);

  server.use(router.routes()).use(router.allowedMethods());

  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
