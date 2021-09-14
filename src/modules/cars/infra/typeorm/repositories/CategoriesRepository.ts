import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  // o método recebe um DTO, que abstrai os dados necessários entre as camadas.
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log("criando category");
    const category = this.repository.create({
      description,
      name,
    });

    console.log(category);
    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
