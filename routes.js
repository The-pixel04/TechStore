import { Router } from "express";
import homeController from "./controllers/homeCintroller.js";

const routes = Router();    

routes.use(homeController);

export default routes;