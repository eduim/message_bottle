import Koa from 'koa';
import getRadomMessage from '../lib/randomMessage';
import Messages from '../models/Messages';
import Mood from '../models/Mood';

const MessagesController = {
  async getMessage(ctx: Koa.Context) {
    const userId = ctx.user.id;
    const messages = await Messages.getMessages();
    const currentMood = await Mood.getCurrentMood(userId);

    if (!currentMood) {
      ctx.response.status = 400;
      ctx.response.body =
        'You have to submit a mood first in order to get a message.';
      return;
    }

    const message = getRadomMessage(currentMood.mood, messages);

    if (message === undefined) {
      ctx.response.status = 400;
      ctx.response.body = 'There are no messages, post your own';
    } else {
      ctx.response.body = {
        id: message.id,
        currentMood: currentMood.mood,
        entrytext: message.entrytext,
      };
    }
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
    const currentMood = await Mood.getCurrentMood(userId);
    const publishMessage = await Messages.checkTodayMessage(userId);

    if (!currentMood) {
      ctx.response.status = 400;
      ctx.response.body = 'You need to introduce your mood';
    } else if (publishMessage) {
      console.log('here');
      ctx.response.status = 400;
      ctx.response.body = 'Already posted message today';
    } else {
      const message = await Messages.create(text, userId, currentMood.mood);
      ctx.response.body = message;
      ctx.response.status = 201;
    }
  },
};

export default MessagesController;

