import Koa from 'koa';
import Messages from '../models/Messages';

const MessagesController = {
  async getMessage(ctx: Koa.Context) {
    const userId = ctx.user.id;
    ctx.response.body = {
      userId,
      message: 'its working',
    };
  },

  async postMessage(ctx: Koa.Context) {
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

    const message = await Messages.create(text, userId);
    console.log(message);
    ctx.statusCode = 201;
    ctx.response.body = message;
  },
};

export default MessagesController;
