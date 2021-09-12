import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {
    console.log("");
  }

  async execute({ name, description }: IRequest): Promise<void> {
    console.log(name);
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification Already exists");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
