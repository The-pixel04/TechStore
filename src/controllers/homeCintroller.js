import { Router } from "express";
import deviceService from "../services/deviceService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceService.getLatest();

    res.render('home', { pageTitle: 'Home', devices: latestDevices });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

homeController.get('/profile', isAuth, async (req, res) => {
    const ownDevices = await deviceService.getAll({ owner: req.user.id });
    const preferredDevices = await deviceService.getAll({ preferredBy: req.user.id })

    res.render('profile', { ownDevices, preferredDevices })
})

export default homeController;