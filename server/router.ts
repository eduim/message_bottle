import Router from 'koa-router';
import MoodsController from './controllers/moods.controller';
import UsersController from './controllers/Users.controller';

const router = new Router();

router.get('/login/github', UsersController.requestAuthorization);
router.get('/login/github/callback', UsersController.getAuthorization);
router.post('/moods', MoodsController.createMood);
router.get('/moods', MoodsController.getMoods);

export default router;
