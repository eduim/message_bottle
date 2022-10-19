import prisma from '../lib/prisma';
import User from './Users';

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

  static async getCurrentMood(userId: number): Promise<Mood | null> {
    const day = Date.now() - 24 * 60 * 60 * 1000;
    const lastDay = new Date(day).toISOString();

    const moods = await prisma.mood.findMany({
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

    if (moods[0] === undefined) return null;

    return moods[0];
  }

  static async checkTodayMood(userId: number): Promise<boolean> {
    return (await this.getCurrentMood(userId)) !== null;
  }

  static async getMood(): Promise<any> {
    const result = await prisma.$queryRaw`
    SELECT
      date_trunc('day', "public"."Mood"."postDate") as postDate,
      ROUND(AVG("public"."Mood"."mood"),2) as mood
    FROM
      "public"."Mood"
    GROUP BY 1
    `;

    return result;
  }
}

export default Mood;
