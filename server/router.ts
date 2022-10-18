import Router from 'koa-router';
import MessagesController from './controllers/Messages.controller';
import UsersController from './controllers/Users.controller';

const router = new Router();

router.get('/login/github', UsersController.requestAuthorization);
router.get('/login/github/callback', UsersController.getAuthorization);
router.post('/messages', MessagesController.postMessage);

export default router;
