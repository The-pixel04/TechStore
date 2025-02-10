import Device from '../models/Device.js';

export const create = (deviceData, userId) => {
    return Device.create({...deviceData, owner: userId});
}
const deviceService = {
    create
}

export default deviceService;