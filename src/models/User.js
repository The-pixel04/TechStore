import { Schema } from "mongoose";

//modify for specific user data
const UserSchema = new Schema({
    email:{
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

const User = model('User', UserSchema);

export default User;