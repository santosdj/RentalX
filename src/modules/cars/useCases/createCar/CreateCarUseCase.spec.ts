import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 60,
      license_plate: "CBD:1452",
      fine_amount: 20,
      brand: "FIAT",
      category_id: "Category",
    });
    expect(car).toHaveProperty("id");
    expect(car).toBeInstanceOf(Car);
  });

  it("Should not be able to create a new car with an exiting license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Car Description",
        daily_rate: 60,
        license_plate: "CBD:1452",
        fine_amount: 20,
        brand: "FIAT",
        category_id: "Category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Car Description",
        daily_rate: 60,
        license_plate: "CBD:1452",
        fine_amount: 20,
        brand: "FIAT",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should to be able to create a new car with avaiability  equals to true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car Description",
      daily_rate: 60,
      license_plate: "CBD:1452",
      fine_amount: 20,
      brand: "FIAT",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
