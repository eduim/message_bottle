import Mood from '../models/Mood';
import Koa from 'koa';

const MoodsController = {
  async createMood(ctx: Koa.Context, next: Koa.Next) {
    if (
      ctx.request.body === undefined ||
      typeof ctx.request.body?.mood !== 'number'
    ) {
      ctx.status = 400;
      ctx.body = {
        error: 'Missing data in request.',
      };
      return;
    }
    const { mood } = ctx.request.body;
    console.log(mood);
    const record = await Mood.create(mood);
    ctx.statusCode = 201;
    ctx.response.body = record;
  },
};

export default MoodsController;
