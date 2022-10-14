import prisma from '../lib/prisma';

class Mood {
  constructor(
    public id: number,
    public moodId: number,
    public postDate?: string // public user?: Partial<User>
  ) {}

  static async create(
    // userId: number,
    moodId: number,
    postDate: string
  ): Promise<Mood> {
    const { id } = await prisma.mood.create({
      data: {
        moodId,
        postDate

        /// to add user info to the postmood

        // user: {
        //   connect: { id: userId }
        // }
      }
    });
    return new Mood(id, moodId, postDate);
  }
}

export default Mood;
