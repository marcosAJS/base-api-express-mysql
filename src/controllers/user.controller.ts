import { UserService } from '../services/user.service';
import { Request, Response, NextFunction } from "express";
import ValidationError from '../exceptions/ValidationError';

export class UserController {
  constructor(
    private userService = new UserService()
  ) { }

  auth = async (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController => AUTH", req.body);

    const { email, password } = req.body;
    try {
      const response = await this.userService.auth(email, password);

      if (response.ok) { 
        return res.status(200).json(response);
      }

      if (response.message === 'Login/Senha inválidos') { // somente para mudar o status para 401
        return res.status(401).json({ message: response.message })
      }

      throw new ValidationError(response.message);

    } catch (error) {
      console.log('UserController error => ', error);
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController => LIST");
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController - CREATE", req.body);

    const { email, name, password } = req.body;
    try {
      const created = await this.userService.create({ email, name, password });
      if (!created) {
        throw new ValidationError("Error to create an user");
      }

      return res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController - CHANGE PASSWORD", req.body);

    const { currentPass, newPassword } = req.body;
    const { userId } = req.params;
    try {
      const response = await this.userService.changePasword(Number(userId), currentPass, newPassword);
      if (!response) {
        throw new ValidationError("Erro ao alterar a senha");
      }

      if (!response.ok) {
        throw new ValidationError(response.message);
      }

      return res.status(200).json({ message: response.message });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  recoverPassword = async (req: Request, res: Response, next: NextFunction) => {
    console.log("UserController - RECOVER PASSWORD", req.body);

    const { email } = req.body;
    try {
      const response = await this.userService.recoverPassword(email);

      if (!response) {
        throw new ValidationError("Erro ao alterar a senha");
      }

      if (!response.ok) {
        throw new ValidationError(response.message);
      }

      return res.status(200).json({ message: response.message });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

}

export default UserController;
