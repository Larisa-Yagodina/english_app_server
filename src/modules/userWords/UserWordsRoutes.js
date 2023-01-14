import { Router } from 'express';
import getUserWordsByUserId from './getUserWordsByUserId';
import updateUserWord from './updateUserWord';
import postUserWord from './postUserWord';
import deleteUserWord from './deleteUserWord';
import getAllUserWords from './getAllUserWords';

const userWordsRouter = Router();

userWordsRouter.get('/', getAllUserWords);
userWordsRouter.get('/:userId', getUserWordsByUserId);

userWordsRouter.post('/', postUserWord);
userWordsRouter.patch('/:userWordId', updateUserWord);
userWordsRouter.delete('/:userWordId', deleteUserWord);

export default userWordsRouter;