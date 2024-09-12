import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Use .js extension

// Register User
export const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
