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

const getOne = (deviceId) => {
    return Device.findById(deviceId);
}

const prefer = async (deviceId, userId) => {
    const device = await Device.findById(deviceId);
    
    if (device.owner.equals(userId)) {
        throw new Error('You cannot prefer your own offer');
    }

    if(device.preferredList.includes(userId)){
        throw new Error('You have already preferred this offer');
    }

    device.preferredList.push(userId);
    return device.save();
}

const deviceService = {
    create,
    getLatest,
    getAll,
    getOne,
    prefer
}

export default deviceService;