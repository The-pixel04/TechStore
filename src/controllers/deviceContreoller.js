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

deviceController.get("/", async (req, res) => {
    const devices = await deviceService.getAll();
    res.render('devices/catalog', { devices: devices });
});

deviceController.get("/:deviceId/details", async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);
    const isOwner = req.user && req.user.id === device.owner?.toString();
    const isPreferred = device.preferredList.includes(req.user?.id);

    res.render('devices/details', { device: device, isOwner, isPreferred });
});

deviceController.get("/:deviceId/prefer", isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try {
        await deviceService.prefer(deviceId, userId);

    } catch (err) {
        res.render('devices/details', { error: getErrorMessage(err) });
    }

    res.redirect(`/devices/${deviceId}/details`);
});

deviceController.get("/:deviceId/delete", async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try {
        await deviceService.remove(deviceId, userId);

        res.redirect('/devices')
    } catch (err) {
        res.redirect(`/devices/${deviceId}/details`)
    }

});

deviceController.get('/:deviceId/edit', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceService.getOne(deviceId);

    if (!device.owner.equals(req.user.id)) {
        // throw new Error('not allowed');
        return res.redirect(`/devices/${deviceId}/details`)
    }

    res.render('devices/edit', { device })
});

deviceController.post('/:diveceId/edit', isAuth, async (req, res) => {
    const deviceId = req.params.diveceId;
    const newData = req.body;

    try {
        await deviceService.update(deviceId, req.user.id, newData);
        res.redirect(`/devices/${deviceId}/details`);
    } catch (err) {
        res.render('device/edit', { device: newData, error: getErrorMessage(err) })
    }
});

export default deviceController;