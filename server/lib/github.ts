import axios from 'axios';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './constants';

const clientId = GITHUB_CLIENT_ID;
const clientSecret = GITHUB_CLIENT_SECRET;

const getGithubToken = async function (code: string): Promise<any> {
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

  return response.data;
};

const getGitHubData = async function (accessToken: string): Promise<any> {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
  const data = response.data;

  return data;
};

export { getGitHubData, getGithubToken };
