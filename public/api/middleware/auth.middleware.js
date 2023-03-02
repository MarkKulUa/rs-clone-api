"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jwt = require("jsonwebtoken");
const variables_1 = __importDefault(require("../variables"));
exports.default = async (req, res, next) => {
    if (req.method === variables_1.default.METHOD_OPTIONS) {
        return next();
    }
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        if (!token) {
            res.status(401).json({ message: variables_1.default.NOT_AUTHORIZED });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded;
        next();
    }
    catch (e) {
        if (e.name === variables_1.default.TOKEN_EXPIRED_ERROR) {
            return res
                .status(401)
                .json({ message: variables_1.default.TOKEN_EXPIRED });
        }
        else if (e.name === variables_1.default.WEB_TOKEN_ERROR) {
            return res
                .status(401)
                .json({ message: variables_1.default.INVALID_TOKEN });
        }
        else {
            console.error(e);
            return res.status(400).json({ message: e });
        }
    }
};
