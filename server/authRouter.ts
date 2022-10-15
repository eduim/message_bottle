import Router from 'koa-router';
import MoodsController from '../controllers/moods.controller';
import UsersController from './controllers/Users.controller';
import authMiddleware from './middlewares/authentication';

const authRouter = new Router();

authRouter.use(authMiddleware);
authRouter.get('/me', UsersController.authentication);
authRouter.post('/moods', MoodsController.createMood);

export default authRouter;
