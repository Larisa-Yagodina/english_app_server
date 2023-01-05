import { Router } from 'express';
import getUserPhrases from './getUserPhrases';
import updateUserPhrase from './updateUserPhrase';
import postUserPhrase from './postUserPhrase';
import deleteUserPhrase from './deleteUserPhrase';

const serviceRouter = Router();

serviceRouter.get('/', getUserPhrases);
serviceRouter.post('/', postUserPhrase);
serviceRouter.patch('/:userPhraseId', updateUserPhrase);
serviceRouter.delete('/:userPhraseId', deleteUserPhrase);

export default serviceRouter;