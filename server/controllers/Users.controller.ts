import Koa from 'koa';
import { JWT_SECRET } from '../lib/constants';
import { getGitHubData, getGithubToken, redirectUrl } from '../lib/github';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const UsersController = {
  requestAuthorization: async (ctx: Koa.Context): Promise<void> => {
    console.log('redirect to github');
    const callbackUrl = 'http://localhost:3000/login/github/callback';
    const url = redirectUrl(callbackUrl);
    ctx.redirect(url);
  },
  getAuthorization: async (ctx: Koa.Context): Promise<void> => {
    console.log('callback from github with auth code/token');
    const code = ctx.query.code;
    if (typeof code !== 'string') {
      throw new Error('code no string');
    }

    // get the access token from github
    const { access_token: accessToken, expires_in: expiresIn } =
      await getGithubToken(code);

    // get the user's data from github
    const { login: user, id: githubId } = await getGitHubData(accessToken);

    // create the JWT
    const secret = JWT_SECRET;
    const jwtToken = jwt.sign({ foo: accessToken }, secret);

    const userDB = User.login(githubId, accessToken, user, expiresIn, jwtToken);
    console.log(userDB);
  },
};

export default UsersController;
