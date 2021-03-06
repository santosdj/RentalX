import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

// o serviço não precisa conhecer o request da rota
// somente o name e description, por isto criamos a interface
interface IRequest {
  name: string;
  description: string;
}

// SRP: esta classe só tem um único objetivo que é o de criar categorias
@injectable()
class CreateCategoryUseCase {
  // usando o  D do Solid: invertendo a dependência
  // veja que a declaração abaixo é um hack do javascript não preciso fazer:
  // this.categoriesRepository = categoriesRepository....já está no método do constructor

  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      // Erros no serviço são lançados de volta.
      // pois o serviço não conhece a rota.
      throw new AppError("Category Already exists!");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
