import { Router } from 'express';
import { userController } from '../controllers/_index';
import authGuard from '../midlewares/auth';

export function routes(app: Router) {
  app.get('/users', userController.list);
  app.post('/auth', userController.auth);
  app.post('/users', /* authGuard ,*/userController.create);
  app.post('/user/:userId/change-pwd', authGuard, userController.changePassword);
  app.post('/user/recover-password', userController.recoverPassword);
}
