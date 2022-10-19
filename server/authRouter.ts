import Router from 'koa-router';
import MessagesController from './controllers/Messages.controller';
import MoodsController from './controllers/moods.controller';
import UsersController from './controllers/Users.controller';
import authMiddleware from './middlewares/authentication';

const authRouter = new Router();

authRouter.use(authMiddleware);
authRouter.get('/me', UsersController.authentication);
authRouter.post('/moods', MoodsController.createMood);
authRouter.get('/messages', MessagesController.getMessage);
// authRouter.post('/messages', MessagesController.postMessage);

export default authRouter;
