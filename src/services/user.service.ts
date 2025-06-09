import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { IUser } from './../models/user.model';
import { CrudService } from "./_crud.service";
import mailer from '../modules/mailer';

export class UserService extends CrudService<User> {
  constructor() {
    super(User);
  }

  async auth(email: string, password: string) {
    //TODO: auth code
    const found = await this.repository.findOne({
      where: { email }
    });

    // se não existir retornar erro
    if (!found)
      return { ok: false, message: 'Login/Senha inválidos' };

    // verificar status 
    if (!found.status)
      return { ok: false, message: 'Usuário não autorizado' };

    // validar a senha
    if (!bcrypt.compareSync(password, found.password))
      return { ok: false, message: 'Login/Senha inválidos' };

    // gerar o token
    const token = jwt.sign(
      { id: found.id, email: found.email, name: found.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 /*  1 day */ }
    );

    return { ok: true, message: 'Login efetuado', token, id: found.id };
  }

  findAll() {
    return this.repository.findAll({
      attributes: ['id', 'email', 'name', 'created_at']
    })
  }

  create(user: IUser) {

    // iniciar o usuário com status falso
    user.status = false;

    // criptografa a senha
    const cryptedPassword = bcrypt.hashSync(user.password, 10);
    user.password = cryptedPassword;

    return this.repository.create(user);
  }

  async changePasword(userId: number, currentPass: string, newPassword: string) {

    const found = await this.repository.findOne({ where: { id: userId } });

    if (!found) return { ok: false, message: 'Usuário não encontrado' };

    // check if current password is correct
    if (!bcrypt.compareSync(currentPass, found.password))
      return { ok: false, message: 'Senha atual incorreta' };

    const cryptedPassword = bcrypt.hashSync(newPassword, 10);

    await this.repository.update({ password: cryptedPassword }, { where: { id: userId } })
    return { ok: true, message: 'Senha atualizada com êxito.' };

  }

  async recoverPassword(email: string) {

    const found = await this.repository.findOne({ where: { email } });
    if (!found) return { ok: false, message: 'Usuário não encontrado' };

    const password = makeid(5);
    // const password = '1234';
    const cryptedPassword = bcrypt.hashSync(password, 10);
    found.password = cryptedPassword;

    try {
      await this.repository.update({ password: cryptedPassword }, { where: { id: found.id } });

      await mailer.sendMail({
        to: email,
        from: process.env.MAIL_FROM_ADDRESS,
        subject: "Recuperação de senha",
        template: 'forgot-password',
        context: { email: found.email, password }
      }, (error) => {
        console.log('Error: ', error)
        if (error) throw new Error('Não foi possível enviar um e-mail de recuperação de senha.');
      })

      return { ok: true, message: 'Senha alterada, enviamos um e-mail com as instruções de novo acesso.' };

    } catch (error) {

      return { ok: false, message: 'Não foi possível atualizar a sua senha' };

    }


  }
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
