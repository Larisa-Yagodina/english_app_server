import { Router } from 'express';
import deleteUser from './deleteUser';
import UserController from './controllers/user-controller';
import getUser from './getUser';
import {body} from 'express-validator';
import getToken from './getToken';
import authMiddleware from './middleware/auth-middleware';
import deleteTokens from './deleteToken';

const userRouter = Router();

userRouter.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 5, max: 32}),
  UserController.registration
);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.get('/tokens', getToken);
userRouter.delete('/tokens', deleteTokens);


userRouter.get('/activation/:link', UserController.activate);
userRouter.post('/activation_send_mail', UserController.sendActivateMail);

userRouter.get('/refresh', UserController.refresh);

userRouter.post('/reset_password', UserController.resetPassword);

userRouter.post('/forgot_password', UserController.forgotPassword);
//userRouter.get('/reset-password/:id/:token', UserController.checkResetPasswordLink);
userRouter.post('/reset-password/:id', UserController.resetPasswordThroughLink);


userRouter.get('/users',
  authMiddleware,
  UserController.getUsers);

userRouter.get('/', getUser);

userRouter.delete('/:userId', deleteUser);

export default userRouter;