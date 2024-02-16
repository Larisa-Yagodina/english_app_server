import express from 'express';
import errorHandler from './src/modules/errorHandler';
import logger from './src/modules/core/logger';
import parseResponse from './src/modules/core/parseResponse';
//import cors from './src/modules/core/cors';
import cors from 'cors';
import routes from './src/modules/core/routes';
import dbConnect from './src/modules/core/db';
require('dotenv').config();
import cookieParser from 'cookie-parser';
import errorMiddleware from './src/modules/users/exceptions/api-errors';
import ignoreFavicon from './src/modules/core/ignoreFavicon';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['https://english-up.netlify.app', 'http://localhost:3000', 'https://english-up.netlify.app/', 'http://localhost:3001/', 'http://localhost:3002/'],
  //methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
  //optionsSuccessStatus: 204,
  //allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'crossDomain', 'X-Requested-With' ],
  credentials: true,
}

dbConnect()
logger(app)
parseResponse(app)
app.use(cookieParser());
app.use(cors(corsOptions))
app.set("view engine", "ejs");
ignoreFavicon(app);
//cors(app)
routes(app)
app.use(errorMiddleware)
errorHandler(app)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// for package json из видео про babel
// "start": "npm run build && node build",
// "build": "npm run clean && babel src -d build",
// "dev": "nodemon --inspect -r dotenv/config -r babel-register src",

// const j = JSON.stringify(obj) - перевод объекта в JSON
// const z = JSON.parse(j) - перевод обратно в объект

// babel src/index.js -d lib


//Аутентификация

// const posts = [
//   {userName: "Alice",
//     title: 'Post 1'},
//   {userName: "Bob",
//     title: 'Post 2'},
// ]

// app.get('/posts', authentificateToken, (req, res) => {
//   res.json(posts.filter(post => post.userName === req.user.name))
// })
//
// app.post('/login', (req, res) => {
//   const userName = req.body.userName;
//   const user = {name: userName};
//
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//
//   res.json({accessToken: accessToken})
// })

// const accessToken = jwt.sign(
//   {'userName': findUser.userName},
//   process.env.ACCESS_TOKEN_SECRET,
//   {expiresIn: '30s'}
// )

// сохранить этот токен с текущим юзером
// const refreshToken = jwt.sign(
//   {'userName': findUser.userName},
//   process.env.REFRESH_TOKEN_SECRET,
//   {expiresIn: '1d'}
// )

// res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
// res.json({accessToken})

// function authentificateToken(req, res, next) {
//   //Bearer token
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) return res.sendStatus(401) // нет токена
//   // верификация
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403) //токен есть, но он не действует
//     req.user = user // мы знаем, что к нам пришел реальный юзер
//     next() //идем в мидлвэар
//   })
// }
// токен лучше хранить в куки с http only