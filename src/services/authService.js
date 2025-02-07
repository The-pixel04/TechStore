import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";


const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export default {
    async register(userData) {
        if (userData.password !== userData.confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const user = await User.findOne({ email: userData.email }).select({ _id: true });

        if (user) {
            throw new Error('Email already exists');
        }

        const createdUser = await User.create(userData);
        const token = generateToken(createdUser);
        return token;
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.comparePassword(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const token = generateToken(user)
        return token;
    }
}