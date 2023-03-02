"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.get('/get-users', auth_middleware_1.default, user_controller_1.default.GetUsers);
authRouter.get('/', auth_middleware_1.default, user_controller_1.default.GetUser);
authRouter.get('/:id', auth_middleware_1.default, user_controller_1.default.GetUserData);
exports.default = authRouter;
