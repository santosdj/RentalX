import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUserCase } from "./UpdateUserAvatarUserCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const avatarFile = request.file.filename;
    const updateUserAvatarUserCase = container.resolve(
      UpdateUserAvatarUserCase
    );
    await updateUserAvatarUserCase.execute({ user_id: id, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
