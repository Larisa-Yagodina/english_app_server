import UserService from '../services/UserService';
import {validationResult} from 'express-validator';
import UserModel from '../Model';
import bcrypt from 'bcrypt';
import UserDto from '../dtos/userDto';
import tokenService from '../services/TokenService';
import * as uuid from 'uuid';
import mailService from '../services/MailService';

class UserController {


  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
        res.status(402).send('Пожалуйста, введите корректные данные')
      }
      const {email, password} = req.body;
      //const userData = await UserService.registration(email, password);

      const candidate = await UserModel.findOne({email});
      if (candidate) {
        //throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`);
        res.status(402).send(`Пользователь с адресом ${email} уже существует`)
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();
      const user = await UserModel.create({email, password: hashPassword, activationLink, isActivated: false});
      await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      const userData = {...tokens, user: userDto};

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none'});

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }


  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      // const userData = await UserService.login(email, password);

      const user = await UserModel.findOne({email})
      if (!user) {
        //throw ApiError.BadRequest('Пользователь с таким email не найден')
        res.status(403).send('Пользователь с таким email не найден')
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        // throw ApiError.BadRequest('Неверный пароль');
        res.status(403).send('Неверный пароль')

      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      const userData = {...tokens, user: userDto}

      res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none'});
      return res.json(userData);

    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token)
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }


  async resetPasswordOpenForm(req, res, next) {
    console.log(req)
    try {
      const activationLink = req.params.link;
      //await UserService.resetPassword(activationLink);
      return res.redirect(process.env.CLIENT_URL + '/password/');
    } catch (e) {
      next(e);
    }
  }


  async refresh(req, res, next) {
    try {
      console.log(' --- cookies --- ');
      console.log(req.cookies);
      const {refreshToken} = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none'});
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }


  async forgotPassword(req, res, next) {
    console.log(' --- forgot password---');
    try {
      const {email} = req.body;
      console.log(email);
      const candidate = await UserModel.findOne({email});
      console.log(candidate);
      if (!candidate) {
        //throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`);
        res.status(402).send(`Пользователя с адресом ${email} не существует, вам необходимо зарегистрироваться`)
      }
      const resetPasswordLink = uuid.v4();
      await mailService.sendResetPasswordMail(email, `${process.env.API_URL}/user/reset_password/${resetPasswordLink}`);
      return res.status(203).send(`На ваш емэйл ${email} отправлена ссылка для смены пароля`);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new UserController();

