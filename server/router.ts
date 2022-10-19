import Router from 'koa-router';
import MessagesController from './controllers/Messages.controller';
import MoodsController from './controllers/Moods.controller';
import UsersController from './controllers/Users.controller';

const router = new Router();

router.get('/login/github', UsersController.requestAuthorization);
router.get('/login/github/callback', UsersController.getAuthorization);
router.post('/messages', MessagesController.postMessage);
router.post('/moods', MoodsController.createMood);
router.get('/moods', MoodsController.getMoods);

export default router;
