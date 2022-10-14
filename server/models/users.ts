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
    const { intStartDate, startDate } = await prisma.user.upsert({
      select: {
        intStartDate: true,
        startDate: true,
      },
      where: { id: githubId },
      update: {
        githubToken: accessToken,
        githubTokenExpires: expiresIn,
      },
      create: {
        id: githubId,
        githubToken: accessToken,
        githubTokenExpires: expiresIn,
        githubUser: user,
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
