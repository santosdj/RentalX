import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin!");
  }

  next();
}
