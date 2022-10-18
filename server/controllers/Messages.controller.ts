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
    const currentMood = await Mood.checkTodayMood(userId);
    // const currentMood = [1];

    const publishMessage = await Messages.checkTodayMessage(userId);
    if (currentMood.length === 0) {
      ctx.response.body = 'You need to introduce your mood';
      ctx.response.status = 200;
    } else if (publishMessage) {
      ctx.response.body = 'Already posted message today';
      ctx.response.status = 200;
    } else {
      const message = await Messages.create(text, userId, currentMood[0]);
      ctx.response.body = message;
      ctx.response.status = 201;
    }
  },
};

export default MessagesController;
