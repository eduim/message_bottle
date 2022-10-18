import prisma from '../lib/prisma';

class Messages {
  constructor(
    public id: number,
    public userId: number,
    public entrytext: string,
    public postDate: Date
  ) {}

  static async create(entrytext: string, userId: number): Promise<Messages> {
    const { id, postDate } = await prisma.message.create({
      data: {
        entrytext,
        user: {
          connect: { id: userId },
        },
      },
    });

    return new Messages(id, userId, entrytext, postDate);
  }
}

export default Messages;
