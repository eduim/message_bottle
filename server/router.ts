import Router from 'koa-router';
import UsersController from './controllers/Users.controller';
import MoodsController from './controllers/moods.controller';

const router = new Router();

router.get('/login/github', UsersController.requestAuthorization);
router.get('/login/github/callback', UsersController.getAuthorization);
router.post('/moods', MoodsController.createMood);

export default router;
