import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const deviceController = Router();

deviceController.get("/create", isAuth, (req, res) => {
    res.render('devices/create');
});

deviceController.post("/create", isAuth, async (req, res) => {
    const deviceData = req.body;
    const userId = req.user.id;

    try {
        await deviceService.create(deviceData, userId);
        res.redirect('/devices');

    } catch (err) {
        res.render('devices/create', { device: deviceData, error: getErrorMessage(err) });
    }

});

export default deviceController;