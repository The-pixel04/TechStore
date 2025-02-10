import Device from '../models/Device.js';

export const create = (deviceData, userId) => {
    return Device.create({ ...deviceData, owner: userId });
}

export const getLatest = () => {
    return Device.find({}).sort({ createdAt: 'desc' }).limit(3);
}

const getAll = () => {
    return Device.find({});
}

const deviceService = {
    create,
    getLatest,
    getAll
}

export default deviceService;