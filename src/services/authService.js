import User from "../models/User.js"


export default {
    async register(userData) {
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const user = await User.findOne({ email: userData.email }).select({ _id: true });

        if (user) {
            throw new Error('Email already exists');
        }

        return User.create(userData);
    }
}