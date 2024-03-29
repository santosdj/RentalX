import { Request, Response } from "express";
import { container } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });
    return response.json(cars);
  }
}

export { ListAvailableCarsController };
