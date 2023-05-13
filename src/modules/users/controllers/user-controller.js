import UserService from '../services/UserService';
import {validationResult} from 'express-validator';
import UserModel from '../Model';
import bcrypt from 'bcrypt';
import UserDto from '../dtos/userDto';
import tokenService from '../services/TokenService';
import * as uuid from 'uuid';
import mailService from '../services/MailService';
import jwt from 'jsonwebtoken';

class UserController {


  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
        res.status(402).send('Пожалуйста, введите корректные данные');
      }
      const {email, password} = req.body;
      //const userData = await UserService.registration(email, password);

      const candidate = await UserModel.findOne({email});
      if (candidate) {
        //throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`);
        res.status(402).send(`Пользователь с адресом ${email} уже существует`);
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();
      const user = await UserModel.create({email, password: hashPassword, activationLink, isActivated: false});
      await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      const userData = {...tokens, user: userDto};

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }


  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      // const userData = await UserService.login(email, password);

      const user = await UserModel.findOne({email});
      if (!user) {
        //throw ApiError.BadRequest('Пользователь с таким email не найден')
        res.status(403).send('Пользователь с таким email не найден');
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        // throw ApiError.BadRequest('Неверный пароль');
        res.status(403).send('Неверный пароль');

      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      const userData = {...tokens, user: userDto};

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
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
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL + '/user/activation');
    } catch (e) {
      next(e);
    }
  }


  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
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


  async resetPassword(req, res, next) {
    try {
      const {oldPassword, password, email} = req.body;

      const user = await UserModel.findOne({email});
      if (!user) {
        res.status(402).send(`Пользователя с адресом ${email} не существует`);
      }

      const isPassEquals = await bcrypt.compare(oldPassword, user.password);
      if (!isPassEquals) {
        // throw ApiError.BadRequest('Неверный пароль');
        res.status(403).send('Текущий пароль неверный');
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const newPasswordAdded = await UserModel.updateOne({email}, {password: hashPassword});
      res.status(203).send('Новый пароль успешно сохранен');

    } catch (e) {
      next(e);
    }
  }


  async forgotPassword(req, res, next) {
    try {
      const {email} = req.body;
      const user = await UserModel.findOne({email});

      if (!user) {
        //throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`);
        res.status(402).send(`Пользователя с адресом ${email} не существует. Проверьте е-мэйл или зарегистрируйтесь.`);
      }
      const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
      const token = jwt.sign({email: user.email, id: user._id}, secret, {
        expiresIn: '3h',
      });
      const link = `${process.env.CLIENT_URL}/user/password-reset/${user._id}`;
      await mailService.sendResetPasswordMail(email, link);

      const userData = {token, id: user._id};
      res.cookie('token', userData.token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async resetPasswordThroughLink(req, res) {

    const {token} = req.cookies;
    const {id, password} = req.body;
    const user = await UserModel.findOne({_id: id});
    if (!user) {
      res.status(402).send('Пользователя не существует');
    }
    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    try {
      const verify = jwt.verify(token, secret);
      const hashPassword = await bcrypt.hash(password, 3);
      const newPasswordAdded = await UserModel.updateOne({_id: id}, {password: hashPassword});
      res.status(203).send('Новый пароль успешно сохранен');
      //return res.redirect(process.env.CLIENT_URL + '/login');
      //res.render('confirm');
    } catch (e) {
      res.status(403).send('Не удалось изменить пароль. Возможно, срок действия этой ссылки истек.');
    }
  }


}


module.exports = new UserController();

