import Koa from 'koa';
import { GITHUB_CLIENT_ID, JWT_SECRET } from '../lib/constants';
import { getGitHubData, getGithubToken } from '../lib/github';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const clientId = GITHUB_CLIENT_ID;

const GithubController = {
  requestAuthorization: async (ctx: Koa.Context): Promise<void> => {
    console.log('redirect to github');
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/login/github/callback`;
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

export default GithubController;
