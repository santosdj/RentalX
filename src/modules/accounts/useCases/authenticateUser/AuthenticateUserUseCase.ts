import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
interface IRequest {
  email: string;
  password: string;
}
@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User or password incorrect!", 401);
    }
    const passwordMatch = await compare(password, (await user).password);
    if (!passwordMatch) {
      throw new AppError("User or password incorrect!", 401);
    }

    const token = sign({}, "29c0b9c692f1c18c45f02388bc78ddf6", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: { name: user.name, email },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
