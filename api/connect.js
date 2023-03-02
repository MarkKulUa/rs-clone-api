"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = ({ uri }) => {
    const connect = async () => {
        try {
            await mongoose_1.default.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
        }
        catch (e) {
            console.warn(e.message);
            process.exit(1);
        }
    };
    connect();
};
