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
        error: 'Missing data in request.'
      };
      return;
    }
    const { mood } = ctx.request.body;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const postDate = `${dd}/${mm}/${yyyy}`;
    console.log(postDate);

    const record = await Mood.create(mood, postDate);
    ctx.statusCode = 201;
    ctx.response.body = record;
  }
};

export default MoodsController;
