import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import dotenv from 'dotenv';
import bodyParser from 'koa-body';
import axios, { responseEncoding } from 'axios';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './lib/constants';
import { createContext } from 'vm';
import Application from 'koa';
import koaBody from 'koa-body';

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
  server.use(bodyParser());

  router.get('/login/github', async (ctx) => {
    console.log('redirect to github');
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/login/github/callback`;
    ctx.redirect(url);
  });
  // http://localhost:3000/login/github/callback?code=88ac28dcc9585e48bf58

  const getToken = async function (code: string): Promise<any> {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const getGitHubData = async function (accessToken: string): Promise<any> {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
    const data = response.data;
    console.log(data);
    return data;
  };

  router.get('/login/github/callback', async (ctx) => {
    console.log('callback from github with auth code/token');
    const code = ctx.query.code;
    if (typeof code !== 'string') {
      throw new Error('code no string');
    }
    const { access_token: accessToken, expires_in: expiresIn } = await getToken(
      code
    );
    console.log(accessToken, expiresIn);
    // insert in bbdd
    const { login: user, id: githubId } = await getGitHubData(accessToken);
    console.log(user, githubId);
    const secret = JWT_SECRET;
    const token = jwt.sign({ foo: accessToken }, secret);
    console.log(token);
  });

  // const authMiddleware: Koa.Middleware = async function (
  //   ctx: Koa.Context,
  //   next: Koa.Next
  // ) {
  //   const token = ctx.headers.authorization?.split('Bearer ')[1];
  //   if (token === undefined) {
  //   //   ctx.res.statusCode = 401;
  //   //   return;
  //     return await next()
  //   }
  //   const secret = JWT_SECRET;

  //   ctx.user = jwt.verify(token, secret);
  //   await next();
  // };

  // server.use(authMiddleware);
  server.use(router.routes()).use(router.allowedMethods());

  server.use(handleRequest);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
