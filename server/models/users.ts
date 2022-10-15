import prisma from '../lib/prisma';

class User {
  constructor(
    public id: number,
    public user: string,
    public expiresIn: number,
    public token?: string,
    public intStartDate?: boolean,
    public startDate?: number | null
  ) {}

  static async login(
    githubId: number,
    accessToken: string,
    user: string,
    expiresIn: number,
    jwtToken: string
  ): Promise<User> {
    const { int_start_date: intStartDate, start_date: startDate } =
      await prisma.user.upsert({
        select: {
          int_start_date: true,
          start_date: true,
        },
        where: { id: githubId },
        update: {
          github_token: accessToken,
          github_token_expires: expiresIn,
        },
        create: {
          id: githubId,
          github_token: accessToken,
          github_token_expires: expiresIn,
          github_user: user,
          token: jwtToken,
        },
      });
    return new User(
      githubId,
      user,
      expiresIn,
      jwtToken,
      intStartDate,
      startDate
    );
  }
}

export default User;
