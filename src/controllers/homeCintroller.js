import { Router } from "express";
import deviceService from "../services/deviceService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceService.getLatest();

    res.render('home', { pageTitle: 'Home', devices: latestDevices });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

export default homeController;