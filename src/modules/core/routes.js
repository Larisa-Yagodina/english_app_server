import tasksRouter from '../userWords/UserWordsRoutes';
import statusesRouter from '../statuses/StatusesRoutes';
import home from '../home';
import servicesRouter from '../services/ServicesRouter';
import UserPhrasesRouter from '../userPhrases/UserPhrasesRouter';
import userRouter from '../users/userRouter';

// english-app-server-7edr2daej-larisa-yagodina.vercel.app
console.log('---routes---');

export default function routes(app){
  app.use('/user', userRouter)
  app.use('/userWords', tasksRouter)
  app.use('/statuses', statusesRouter)
  app.use('/services', servicesRouter)
  app.use('/userPhrases', UserPhrasesRouter)

}

