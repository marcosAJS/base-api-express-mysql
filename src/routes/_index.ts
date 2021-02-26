import { Router } from 'express';
import * as UserRoutes from './user.routes';

export function initRoutes(app: Router) {
  console.log('info', '--> Start routes');
  UserRoutes.routes(app);
  console.log('info', '--> Finish routes');
}
