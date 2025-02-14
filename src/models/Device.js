import { Schema, model, Types } from 'mongoose';

const DeviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        minLenght: 2
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        minLenght: 5
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard Disk is required'],
        minLenght: 5
    },
    screenSize: {
        type: String,
        required: [true, 'Screen Size is required'],
        minLenght: 1
    },
    ram: {
        type: String,
        required: [true, 'Ram is required'],
        minLenght: 2
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating System is required'],
        minLenght: 5,
        maxLenght: 20
    },
    cpu: {
        type: String,
        required: [true, 'CPU is required'],
        minLenght: 10,
        maxLenght: 50
    },
    gpu: {
        type: String,
        required: [true, 'GPU is required'],
        minLenght: 10,
        maxLenght: 50
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    color: {
        type: String,
        required: [true, 'Color is required'],
        minLenght: 2,
        maxLenght: 10
    },
    weight: {
        type: String,
        required: [true, 'Weight is required'],
        minLenght: 1
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        // match: /^https?:\/\//
    },
    preferredList: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Device = model('Device', DeviceSchema);

export default Device;