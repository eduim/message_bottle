import prisma from '../lib/prisma';
import User from './users';

class Mood {
  constructor(
    public id: number,
    public mood: number,
    public postDate?: Date,
    public user?: Partial<User>
  ) {}

  static async create(mood: number, userId: number): Promise<Mood> {
    const { id, postDate } = await prisma.mood.create({
      data: {
        mood,

        /// to add user info to the postmood
        user: {
          connect: { id: userId },
        },
      },
    });

    return new Mood(id, mood, postDate);
  }

  static async getCurrentMood(userId: number): Promise<any> {
    const day = Date.now() - 24 * 60 * 60 * 1000;
    const lastDay = new Date(day).toISOString();

    const lastMood = await prisma.mood.findMany({
      where: {
        AND: [
          {
            userId,
          },
          {
            postDate: {
              gte: lastDay,
            },
          },
        ],
      },
      orderBy: {
        postDate: 'desc',
      },
      take: 1,
    });

    return lastMood;
  }

  static async checkTodayMood(userId: number): Promise<boolean> {
    const day = Date.now() - 24 * 60 * 60 * 1000;
    const lastDay = new Date(day).toISOString();
    try {
      const lastMood = await prisma.mood.findMany({
        where: {
          AND: [
            {
              userId,
            },
            {
              postDate: {
                gte: lastDay,
              },
            },
          ],
        },
        orderBy: {
          postDate: 'desc',
        },
        take: 1,
      });

      const currentDay = new Date(Date.now()).getDate();
      return lastMood[0].postDate.getDate() === currentDay;
    } catch {
      return false;
    }
  }

  static async getMood(): Promise<any> {
    const result = await prisma.$queryRaw`
    SELECT
      date_trunc('day', "public"."Mood"."postDate") as postDate,
      ROUND(AVG("public"."Mood"."mood"),2) as av_mood
    FROM
      "public"."Mood"
    GROUP BY 1
    `;

    return result;
  }
}

export default Mood;
