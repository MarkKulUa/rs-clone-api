"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./connect"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const nodes_1 = __importDefault(require("./routes/nodes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/auth', auth_1.default);
app.use('/api/user', users_1.default);
app.use('/api/node', nodes_1.default);
app.use((req, res) => {
    res.json({
        statusCode: 404,
    });
});
app.use((err, req, res) => {
    res.json({
        statusCode: 500,
        message: err.message,
        stack: err.stack,
    });
});
const uri = process.env.MONGODB_URI || 'mongodb+srv://rsclone:Rsclone_23@cluster0rsclone.ncyuk33.mongodb.net/?retryWrites=true&w=majority';
(0, connect_1.default)({ uri });
exports.default = app;
