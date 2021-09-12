import { Category } from "../entities/Category";
// criando um objeto DTO para isolar a rota do repositório
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(ICreateCategoryDTO): Promise<void>;
}
export { ICategoriesRepository, ICreateCategoryDTO };
