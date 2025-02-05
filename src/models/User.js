import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

//modify for specific user data
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,

    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hashSync(this.password, 10);
});

const User = model('User', UserSchema);

export default User;