import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http//middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
// preciso instanciar o Router uma vez que ele não está no mesmo arquivo onde demos o
// const app = express();
const categoriesRoutes = Router();
// Classe que conhece a minha estrutura de persistência.

const uploadEmployees = multer(uploadConfig.upload("./tmp/categories"));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  uploadEmployees.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

// exporto a rota e importo no meu arquivo de servidor;
export { categoriesRoutes };
