import { Router } from "express";
import homeController from "./controllers/homeCintroller.js";
import authController from "./controllers/authController.js";
import deviceController from "./controllers/deviceContreoller.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/devices', deviceController);

routes.get('*', (req, res) => {
    res.render('404');
})

export default routes;