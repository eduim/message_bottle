import { networkInterfaces } from 'os';
import prisma from '../lib/prisma';

class Messages {
  constructor(
    public id: number,
    public userId: number,
    public entrytext: string,
    public mood: number,
    public postDate: Date
  ) {}

  static async create(
    entrytext: string,
    userId: number,
    mood: number
  ): Promise<Messages> {
    const { id, postDate } = await prisma.message.create({
      data: {
        entrytext,
        user: {
          connect: { id: userId },
        },
        mood: {
          connect: { id: mood },
        },
      },
    });

    return new Messages(id, userId, entrytext, mood, postDate);
  }

  static async checkTodayMessage(userId: number): Promise<boolean> {
    const day = Date.now() - 24 * 60 * 60 * 1000;
    const lastDay = new Date(day).toISOString();
    try {
      const lastMessage = await prisma.message.findMany({
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

      return lastMessage[0].postDate.getDate() === currentDay;
    } catch {
      return false;
    }
  }

  static async getMessages(): Promise<any | null> {
    const date = new Date();
    const lastWeek = new Date(date.setDate(date.getDate() - 7)).toISOString();
    try {
      const messagesLastWeek = await prisma.message.findMany({
        where: {
          postDate: {
            gte: lastWeek,
          },
        },
      });
      return messagesLastWeek;
    } catch {
      return null;
    }
  }
}

export default Messages;
