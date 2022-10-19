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
    const userId = ctx.user.id;
    const todayMood = await Mood.checkTodayMood(userId);
    console.log('todayMood', todayMood);
    const currentMood = await Mood.getCurrentMood(userId);
    console.log('currentMood', currentMood);
    const publishMessage = await Messages.checkTodayMessage(userId);
    if (!todayMood) {
      ctx.response.body = 'You need to introduce your mood';
      ctx.response.status = 200;
    } else if (!publishMessage) {
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
