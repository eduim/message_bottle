import Mood from '../models/Mood';
import Koa from 'koa';

const MoodsController = {
  async createMood(ctx: Koa.Context, next: Koa.Next) {
    if (ctx.request.body === undefined) {
      return;
    }
    const { moodId } = ctx.request.body;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const postDate = `${dd}/${mm}/${yyyy}`;
    console.log(postDate);

    if (typeof moodId !== 'number') {
      return;
    }

    const mood = await Mood.create(moodId, postDate);
    ctx.statusCode = 201;
    ctx.response.body = mood;
  }
};

export default MoodsController;
