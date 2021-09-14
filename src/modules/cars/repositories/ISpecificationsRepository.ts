import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name): Promise<Specification>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  // list(): Specification[];
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
