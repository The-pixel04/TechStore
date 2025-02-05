import { Router } from "express";
import homeController from "./src/controllers/homeCintroller.js";
import authController from "./src/controllers/authController.js";

const routes = Router();    

routes.use(homeController);
routes.use('/auth', authController);

export default routes;