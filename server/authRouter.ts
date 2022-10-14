import Router from 'koa-router';
import UsersController from './controllers/Users.controller';
import authMiddleware from './middlewares/authentication';
const authRouter = new Router();

authRouter.get('/me', authMiddleware, UsersController.authentication);

export default authRouter;
