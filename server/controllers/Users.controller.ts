import Koa from 'koa';
import { JWT_SECRET } from '../lib/constants';
import { getGitHubData, getGithubToken, redirectUrl } from '../lib/github';
import jwt from 'jsonwebtoken';
import User from '../models/Users';

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
      ctx.throw(401, 'Unauthorized');
    }

    // get the access token from github
    const { access_token: accessToken, expires_in: expiresIn } =
      await getGithubToken(code);

    // get the user's data from github
    const { login: user, id: githubId } = await getGitHubData(accessToken);

    // create the JWT
    const secret = JWT_SECRET;
    const payload = {
      id: githubId,
      user,
      accessToken,
    };

    const jwtToken = jwt.sign(payload, secret);

    const userDB = await User.login(githubId, accessToken, user, expiresIn);
    console.log(userDB, jwtToken);
    // ctx.response.body = {
    //   token: jwtToken
    // };
    ctx.redirect(`http://localhost:3000?token=${jwtToken}`);
  },

  authentication: async (ctx: Koa.Context): Promise<void> => {
    const tokenDecifer = ctx.user;
    // hard coded team and currentDate until the feature is implemented
    ctx.response.body = {
      name: tokenDecifer.user,
      team: 'arol',
      currentDate: 24,
    };
  },
};

export default UsersController;
