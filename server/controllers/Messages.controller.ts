import Koa from 'koa';
import Messages from '../models/Messages';
import Mood from '../models/Mood';

const MessagesController = {
  async getMessage(ctx: Koa.Context) {
    const userId = ctx.user.id;
    ctx.response.body = {
      userId,
      message: 'its working',
    };
  },

  async postMessage(ctx: Koa.Context, next: Koa.Next) {
    if (
      ctx.request.body === undefined ||
      typeof ctx.request.body.entrytext !== 'string'
    ) {
      ctx.throw('message empty');
    }
    const text = ctx.request.body.entrytext;

    // const userId = ctx.user.id;
    // user hardcoded until the authAPI is done
    const userId = 22771927;
    const publishMessage = await Messages.checkTodayMessage(userId);
    const currentMood = await Mood.checkTodayMood(userId);
    if (currentMood === null) {
      ctx.throw('Missing mood');
    }

    if (publishMessage) {
      ctx.response.body = 'Already posted message today';
      ctx.statusCode = 400;
    } else {
      const message = await Messages.create(text, userId, currentMood);
      ctx.response.body = message;
      ctx.statusCode = 201;
    }
  },
};

export default MessagesController;
