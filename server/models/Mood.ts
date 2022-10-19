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
          connect: { id: userId }
        }
      }
    });

    return new Mood(id, mood, postDate);
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
