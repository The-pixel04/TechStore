import Device from '../models/Device.js';

export const create = (deviceData, userId) => {
    return Device.create({ ...deviceData, owner: userId });
};

export const getLatest = () => {
    return Device.find({}).sort({ createdAt: 'desc' }).limit(3);
};

const getAll = (filter = {}) => {
    let query = Device.find({});

    if (filter.owner) {
        query = query.find({ owner: filter.owner })
    }

    if (filter.preferredBy) {
        query = query.in('preferredList', filter.preferredBy)
    }

    return query
};

const getOne = (deviceId) => {
    return Device.findById(deviceId);
};

const prefer = async (deviceId, userId) => {
    const device = await Device.findById(deviceId);

    if (device.owner.equals(userId)) {
        throw new Error('You cannot prefer your own offer');
    }

    if (device.preferredList.includes(userId)) {
        throw new Error('You have already preferred this offer');
    }

    device.preferredList.push(userId);
    return device.save();
};

const remove = async (deviceId, userId) => {
    const device = await getOne(deviceId);

    if (!device.owner.equals(userId)) {
        throw new Error('Only owner can delete!')
    }

    return Device.findByIdAndDelete(deviceId);
}

const update = async (deviceId, userId, deviceData) => {
    const device = await getOne(deviceId);

    if (!device.owner.equals(userId)) {
        throw new Error('Only owner can edit!')
    }

    return Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });

}


const deviceService = {
    create,
    getLatest,
    getAll,
    getOne,
    prefer,
    remove,
    update
}

export default deviceService;