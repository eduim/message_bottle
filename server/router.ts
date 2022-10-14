import Router from 'koa-router';
import UsersController from './controllers/Users.controller';
const router = new Router();

router.get('/login/github', UsersController.requestAuthorization);
router.get('/login/github/callback', UsersController.getAuthorization);

export default router;
