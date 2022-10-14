import Koa from 'koa';
import { JWT_SECRET } from '../lib/constants';
import { getGitHubData, getGithubToken, redirectUrl } from '../lib/github';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const UsersController = {
  requestAuthorization: async (
    ctx: Koa.Context,
    next: Koa.Next
  ): Promise<void> => {
    try {
      console.log('redirect to github');
      const callbackUrl = 'http://localhost:3000/login/github/callback';
      const url = redirectUrl(callbackUrl);
      ctx.redirect(url);
    } catch (e) {
      ctx.throw(500, 'error');
    }
  },

  getAuthorization: async (ctx: Koa.Context): Promise<void> => {
    console.log('callback from github with auth code/token');
    const code = ctx.query.code;
    if (typeof code !== 'string') {
      throw new Error('User no autorithed');
    }

    // get the access token from github
    const { access_token: accessToken, expires_in: expiresIn } =
      await getGithubToken(code);

    // get the user's data from github
    const { login: user, id: githubId } = await getGitHubData(accessToken);

    // create the JWT
    const secret = JWT_SECRET;
    const jwtToken = jwt.sign({ foo: accessToken }, secret);

    const userDB = await User.login(
      githubId,
      accessToken,
      user,
      expiresIn,
      jwtToken
    );
    console.log(userDB);
    ctx.response.body = {
      jwtToken,
      error: 'all right',
    };
    ctx.redirect('http://localhost:3000');
  },

  authentication: async (ctx: Koa.Context): Promise<void> => {
    ctx.response.body = {
      message: 'hi there',
    };
  },
};

export default UsersController;
