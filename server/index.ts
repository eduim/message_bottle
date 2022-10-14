import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import dotenv from 'dotenv';
import bodyParser from 'koa-body';
import GithubController from './controllers/github';

dotenv.config();

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, port });
const handle = app.getRequestHandler();
const clientId: string | undefined = process.env.GITHUB_CLIENT_ID;
const clientSecret: string | undefined = process.env.GITHUB_CLIENT_SECRET;

if (clientId === undefined || clientSecret === undefined) {
  throw new Error('missing client_id or client_secret');
}

const handleRequest = async (ctx: Koa.Context): Promise<void> => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};

void app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(bodyParser());

  router.get('/login/github', GithubController.requestAuthorization);
  router.get('/login/github/callback', GithubController.getAuthorization);

  // server.use(authMiddleware);
  server.use(router.routes()).use(router.allowedMethods());

  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
