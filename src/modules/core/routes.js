import tasksRouter from '../userWords/UserWordsRoutes';
import statusesRouter from '../statuses/StatusesRoutes';
import home from '../home';
import servicesRouter from '../services/ServicesRouter';
import ordersRouter from '../orders/OrdersRouter';
import UserPhrasesRouter from '../userPhrases/UserPhrasesRouter';

export default function routes(app){
  app.use('/userWords', tasksRouter)
  app.use('/statuses', statusesRouter)
  app.use('/services', servicesRouter)
  app.use('/userPhrases', UserPhrasesRouter)
  app.use('/orders', ordersRouter)
  app.use('/', home)
}

