import { Router } from 'express';
import UserController from '../controllers/user.controller';
import auth from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.get('/get-users', auth, UserController.GetUsers);
authRouter.get('/:id', auth, UserController.GetUserData);

export default authRouter;
