const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

const generateRefreshToken = (userId) => {
    const refreshToken = Math.random().toString(36).substring(7);
    return refreshToken;
}

const verifyRefreshToken = (refreshToken) => {
    try {
        const user = User.findOne({ refreshToken: refreshToken });
        return !!user
    } catch (error) {
        console.log('Refresh token verification error:', error)
        return false
    }
}

module.exports = {generateToken, verifyToken, generateRefreshToken, verifyRefreshToken}