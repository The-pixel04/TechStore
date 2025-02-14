import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

//modify for specific user data
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLenght: 10

    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLenght: 2,
        maxLenght: 20
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLenght: 4
    },
    // ownDevices:[{
    //     type:Types.ObjectId,
    //     ref:'Device'
    // }]
});

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
});

const User = model('User', UserSchema);

export default User;