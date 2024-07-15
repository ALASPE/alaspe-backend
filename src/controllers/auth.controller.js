import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/session.config.js';
import { User } from '../models/User.js';

export const loginUser = async (req, res) => {
    try {
        const { DNI, password } = req.body;

        const user = await User.findOne({ where: { DNI } });
        if (!user) return res.status(400).json({ message: 'Invalid DNI or password.' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid DNI or password.' });

        const token = jwt.sign(
            { id: user.id, DNI: user.DNI },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            }
        );

        if (user.role == 'admin')
            return res.status(200).json({ message: 'Login successful', redirectUrl: '/admin' });
        else
            return res.status(200).json({ message: 'Login successful', redirectUrl: '/user' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res
        .clearCookie('access_token')
        .send('Logout successful.');
};

export const verifySession = (req, res) => {
    const { user } = req.session;
    if (!user) return res.send('Hello, World!');
    res.send(`Hello, ${user.DNI}!`);
};