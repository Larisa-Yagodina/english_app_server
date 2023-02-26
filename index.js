import express from 'express';
import errorHandler from './src/modules/errorHandler';
import logger from './src/modules/core/logger';
import parseResponse from './src/modules/core/parseResponse';
import cors from './src/modules/core/cors';
import routes from './src/modules/core/routes';
import dbConnect from './src/modules/core/db';
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

const posts = [
  {userName: "Alice",
    title: 'Post 1'},
  {userName: "Bob",
    title: 'Post 2'},
]

dbConnect()
logger(app)
parseResponse(app)
cors(app)
//app.use(express.json())
routes(app)
app.get('/posts', (req, res) => {
  res.json(posts)
})
app.post('/login', (req, res) => {
  const userName = req.body.userName;
  const user = {name: userName};

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({accessToken: accessToken})
})
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