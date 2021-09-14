import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
// preciso instanciar o Router uma vez que ele não está no mesmo arquivo onde demos o
// const app = express();
const categoriesRoutes = Router();
// Classe que conhece a minha estrutura de persistência.

const uploadEmployees = multer(uploadConfig.upload("./tmp/employees"));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post(
  "/import",
  uploadEmployees.single("employees"),
  importCategoryController.handle
);

// exporto a rota e importo no meu arquivo de servidor;
export { categoriesRoutes };
