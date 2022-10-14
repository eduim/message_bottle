import prisma from '../lib/prisma';

class Mood {
  constructor(
    public id: number,
    public mood: number,
    public postDate?: string // public user?: Partial<User>
  ) {}

  static async create(
    // userId: number,
    mood: number,
    postDate: string
  ): Promise<Mood> {
    const { id } = await prisma.mood.create({
      data: {
        mood,
        postDate

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
