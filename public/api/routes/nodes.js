"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const node_controller_1 = __importDefault(require("../controllers/node.controller"));
const nodesRouter = (0, express_1.Router)();
nodesRouter.post('/', auth_middleware_1.default, node_controller_1.default.CreateNode);
nodesRouter.get('/', auth_middleware_1.default, node_controller_1.default.GetNodes);
nodesRouter.get('/:id', auth_middleware_1.default, node_controller_1.default.GetNode);
nodesRouter.put('/:id', auth_middleware_1.default, node_controller_1.default.UpdateNode);
nodesRouter.delete('/:id', auth_middleware_1.default, node_controller_1.default.DeleteNode);
exports.default = nodesRouter;
