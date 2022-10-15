import prisma from '../lib/prisma';

class Mood {
  constructor(
    public id: number,
    public mood: number,
    public postDate?: Date // public user?: Partial<User>
  ) {}

  static async create(
    // userId: number,
    mood: number
  ): Promise<Mood> {
    const { id, postDate } = await prisma.mood.create({
      data: {
        mood

        /// to add user info to the postmood

        // user: {
        //   connect: { id: userId }
        // }
      }
    });
    return new Mood(id, mood, postDate);
  }
}

export default Mood;
