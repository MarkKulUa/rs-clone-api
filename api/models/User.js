"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    trees: [{ type: mongoose_1.Types.ObjectId, ref: 'tree' }],
    notifications: [{ type: Object }]
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
