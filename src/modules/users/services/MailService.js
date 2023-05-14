import nodemailer from 'nodemailer';

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'cheeseroll@mail.ru',
        pass: '5RhGDs4jmhwWuinDJFrn'
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'cheeseroll@mail.ru',
      to,
      subject: 'Активация аккаунта в приложении English UP',
      text: '',
      html:
          `
      <div>
         <h1>Для активации перейдите по ссылке:</h1>
         <p> <a href="${link}">ссылка</a> </p>
       </div>
      `
    }
    );
  }

  async sendResetPasswordMail(to, link) {
    await this.transporter.sendMail({
      from: 'cheeseroll@mail.ru',
      to,
      subject: 'Восстановление пароля в приложении English UP',
      text: '',
      html:
          `
      <div>
         <h1>Для восстановления пароля перейдите по ссылке:</h1>
         <p> <a href="${link}">Ссылка.</a> </p>
       </div>
      `
    }
    );
  }


}

module.exports = new MailService();