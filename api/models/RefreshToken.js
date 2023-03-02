"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RefreshToken = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: false },
    refreshToken: { type: String, required: true, unique: false },
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('RefreshToken', RefreshToken);
