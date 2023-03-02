"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NodeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    parentId: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    gender: { type: String },
    birthday: { type: String },
    birthplace: { type: String },
    isLife: { type: Boolean },
    email: { type: String },
    familyStatus: { type: String },
    relationType: { type: String },
    users: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }]
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Node', NodeSchema);
