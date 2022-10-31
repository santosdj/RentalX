import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be possible to list all avaiables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A1",
      description: "Carro bonito",
      daily_rate: 180.0,
      license_plate: "DAS-012345",
      fine_amount: 120.0,
      brand: "Audi",
      category_id: "32cc0dd1-7136-408b-b551-571a8f40ed6b",
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all avaiable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A1",
      description: "Carro bonito",
      daily_rate: 180.0,
      license_plate: "DAS-012345",
      fine_amount: 120.0,
      brand: "Audi Brand",
      category_id: "32cc0dd1-7136-408b-b551-571a8f40ed6b",
    });

    await carsRepositoryInMemory.create({
      name: "Audi A1 - 2020",
      description: "Carro bonito",
      daily_rate: 180.0,
      license_plate: "DAS-0123456",
      fine_amount: 120.0,
      brand: "Audi Brand 2020",
      category_id: "32cc0dd1-7136-408b-b551-571a8f40ed6b",
    });

    const cars = await listCarsUseCase.execute({ name: "Audi A1" });
    console.log("Cars by name=", cars);

    expect(cars).toEqual([car]);
  });
});
