import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("missing token", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "29c0b9c692f1c18c45f02388bc78ddf6"
    ) as IPayLoad;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = { id: user_id };
    next();
  } catch (err) {
    throw new AppError("invalid token", 401);
  }
}
