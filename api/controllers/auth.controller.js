"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const RefreshToken_1 = __importDefault(require("../models/RefreshToken"));
const express_validator_1 = require("express-validator");
const variables_1 = __importDefault(require("../variables"));
const { REGISTRED_USER_ERROR, USER_CREATED, RANDOM_ERROR, INCORECT_PASS, INCORECT_DATA, USER_NOT_FOUND, TOKEN_EXPIRED_ERROR, TOKEN_EXPIRED, MISSING_TOKEN, SESSION_OUT, WEB_TOKEN_ERROR, INVALID_TOKEN, USER_LOGOUT } = variables_1.default;
const CreateUser = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({
                errors: errors.array(),
                message: INCORECT_DATA,
            });
        }
        const { email, fullName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User_1.default
            .create({ email, password: hashedPassword, fullName })
            .then(() => {
            return { message: USER_CREATED };
        })
            .catch(() => {
            return { message: REGISTRED_USER_ERROR };
        });
        if (user) {
            return res.status(201).json(user);
        }
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const SignIn = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!(errors.isEmpty())) {
            return res.status(400).json({
                errors: errors.array(),
                message: INCORECT_DATA,
            });
        }
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: USER_NOT_FOUND });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: INCORECT_PASS });
        }
        user.userId = user._id;
        await RefreshToken_1.default.findOneAndDelete({ userId: user.userId });
        const secret = process.env.JWT_SECRET || 'protectedone';
        const refreshSecret = process.env.REFRESH_JWT_SECRET || 'protecteuptodate';
        const token = jwt.sign({ userId: user.userId }, secret, { expiresIn: '4h' });
        const refreshToken = jwt.sign({ userId: user.userId }, refreshSecret, { expiresIn: '7d' });
        await RefreshToken_1.default.create({ userId: user.userId, refreshToken });
        user.refreshToken = refreshToken;
        user.token = token;
        user.trees = undefined;
        return res.json({
            email: user.email,
            fullName: user.fullName,
            trees: user.trees,
            token: user.token,
            refreshToken: user.refreshToken,
            userId: user._id,
            notifications: user.notifications
        });
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const GetNewToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(403).json({ message: MISSING_TOKEN });
        }
        const token = await RefreshToken_1.default.findOne({ refreshToken });
        if (!token) {
            return res.status(401).json({ message: TOKEN_EXPIRED });
        }
        const secret = process.env.JWT_SECRET || 'protectedone';
        const refreshSecret = process.env.REFRESH_JWT_SECRET || 'protecteuptodate';
        const payload = jwt.verify(token.refreshToken, refreshSecret);
        const accessToken = jwt.sign({ userId: payload['userId'] }, secret, { expiresIn: '4h' });
        return res.status(200).json({ token: accessToken, userId: payload['userId'] });
    }
    catch (e) {
        if (e.name === TOKEN_EXPIRED_ERROR) {
            const { refreshToken } = req.body;
            await RefreshToken_1.default.findOneAndDelete({ refreshToken });
            return res
                .status(401)
                .json({ message: SESSION_OUT });
        }
        else if (e.name === WEB_TOKEN_ERROR) {
            return res
                .status(401)
                .json({ message: INVALID_TOKEN });
        }
        else {
            return res.status(500).json({ message: RANDOM_ERROR });
        }
    }
};
const LogOut = async (req, res) => {
    try {
        const { userId } = req.body;
        await RefreshToken_1.default.findOneAndDelete({ userId });
        return res.status(200).json({ message: USER_LOGOUT });
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
exports.default = {
    CreateUser,
    SignIn,
    GetNewToken,
    LogOut
};
