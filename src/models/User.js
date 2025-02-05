import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

//modify for specific user data
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],

    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
});

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
});

const User = model('User', UserSchema);

export default User;