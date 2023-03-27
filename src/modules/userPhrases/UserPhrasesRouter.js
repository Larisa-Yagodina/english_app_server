import { Router } from 'express';
import getUserPhrases from './getUserPhrases';
import updateUserPhrase from './updateUserPhrase';
import postUserPhrase from './postUserPhrase';
import deleteUserPhrase from './deleteUserPhrase';
import authMiddleware from '../users/middleware/auth-middleware';

const serviceRouter = Router();

serviceRouter.get('/',
  authMiddleware,
  getUserPhrases);
serviceRouter.post('/',
  authMiddleware,
  postUserPhrase);
serviceRouter.patch('/:userPhraseId',
  authMiddleware,
  updateUserPhrase);
serviceRouter.delete('/:userPhraseId',
  authMiddleware,
  deleteUserPhrase);

export default serviceRouter;