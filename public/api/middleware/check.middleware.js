"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const variables_1 = __importDefault(require("../variables"));
const checkRegister = [
    (0, express_validator_1.check)('email', variables_1.default.INCORECT_EMAIL).isEmail(),
    (0, express_validator_1.check)('fullName', variables_1.default.TYPE_STRING).isString(),
    (0, express_validator_1.check)('password', variables_1.default.PASS_LENGHT).isLength({ min: 1 }),
];
const checkLogin = [
    (0, express_validator_1.check)('email', variables_1.default.INCORECT_EMAIL).isEmail().normalizeEmail(),
    (0, express_validator_1.check)('password', variables_1.default.INCORECT_PASS).exists(),
];
exports.default = {
    checkRegister,
    checkLogin
};
