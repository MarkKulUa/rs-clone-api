"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const check_middleware_1 = __importDefault(require("../middleware/check.middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', check_middleware_1.default.checkRegister, auth_controller_1.default.CreateUser);
authRouter.post('/login', check_middleware_1.default.checkLogin, auth_controller_1.default.SignIn);
authRouter.post('/refresh_token', check_middleware_1.default.checkLogin, auth_controller_1.default.GetNewToken);
authRouter.delete('/logout', check_middleware_1.default.checkLogin, auth_controller_1.default.LogOut);
exports.default = authRouter;
