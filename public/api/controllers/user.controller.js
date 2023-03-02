"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Node_1 = __importDefault(require("../models/Node"));
const variables_1 = __importDefault(require("../variables"));
const { RANDOM_ERROR } = variables_1.default;
const GetUserData = async (req, res) => {
    try {
        let user = await User_1.default.findById(req.params.id);
        user.password = undefined;
        user.nodes = await Node_1.default.find();
        return res.status(201).json(user);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const GetUser = async (req, res) => {
    try {
        const { userId } = req.body.user;
        let user = await User_1.default.findById(userId);
        user.password = undefined;
        user.nodes = await Node_1.default.find(); //nodes: INode[];
        return res.status(201).json(user);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const GetUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        return res.status(201).json(users);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
exports.default = {
    GetUser,
    GetUserData,
    GetUsers
};
