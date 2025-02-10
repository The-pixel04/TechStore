import { Schema, model, Types } from 'mongoose';

const DeviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard Disk is required'],
    },
    screenSize: {
        type: String,
        required: [true, 'Screen Size is required'],
    },
    ram: {
        type: String,
        required: [true, 'Ram is required'],
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating System is required'],
    },
    cpu: {
        type: String,
        required: [true, 'CPU is required'],
    },
    gpu: {
        type: String,
        required: [true, 'GPU is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
    },
    weight: {
        type: String,
        required: [true, 'Weight is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    preferredList: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Device = model('Device', DeviceSchema);

export default Device;