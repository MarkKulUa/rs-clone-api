"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../models/Node"));
const variables_1 = __importDefault(require("../variables"));
const { FORBIDDEN_SYMBOLS_REGEXP, INCORECT_CHARTS, RANDOM_ERROR, NODE_NOT_FOUND, PARENT_ID_NOT_FOUND, INCORECT_POSITION, NODE_DELETED } = variables_1.default;
const CreateNode = async (req, res) => {
    try {
        const { name, parentId, gender = null, birthday = null, birthplace = null, isLife = null, email = null, familyStatus = null, relationType = null } = req.body;
        const check = FORBIDDEN_SYMBOLS_REGEXP;
        if (check.test(name)) {
            return res.status(400).json({ message: INCORECT_CHARTS });
        }
        if (!parentId) {
            return res.status(400).json({ message: PARENT_ID_NOT_FOUND });
        }
        const { userId } = req.body.user;
        console.log('node.controller userId:', userId);
        const node = await Node_1.default
            .create({ name, parentId, gender, birthday, birthplace, isLife, email, familyStatus, relationType })
            // .then( async (node: INode) => {
            //   await Column.updateOne( { _id: parentId }, { $push: { nodes: { _id: node._id } } });
            //   return node;
            // })
            .catch((err) => err);
        return res.status(201).json(node);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const GetNode = async (req, res) => {
    try {
        const node = await Node_1.default.findById(req.params.id);
        if (!node) {
            return res.status(404).json({ message: NODE_NOT_FOUND });
        }
        return res.status(201).json(node);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const UpdateNode = async (req, res) => {
    try {
        // const { name, position, content, parentId, add, kick, label } = req.body;
        const { name, parentId, gender, birthday, birthplace, isLife, email, familyStatus, relationType } = req.body;
        const { id } = req.params;
        const node = await Node_1.default.findById(id);
        // // const prevColumn = node.parentId;
        // const currentColumn = parentId;
        if (!node) {
            return res.status(404).json({ message: NODE_NOT_FOUND });
        }
        // if (label) {
        //   const checkLabel = node.labels.findIndex((el) => el.color === label.color);
        //
        //   if (checkLabel === -1) {
        //     node.labels.push(label);
        //   } else {
        //     node.labels.splice(checkLabel, 1);
        //   }
        // }
        // if (add) {
        //   const index = node.users.indexOf(add);
        //
        //   if (index === -1) {
        //     node.users.push(add);
        //   }
        // }
        // if (kick) {
        //   const index = node.users.indexOf(kick);
        //
        //   node.users.splice(index, 1);
        // }
        if (name) {
            const check = FORBIDDEN_SYMBOLS_REGEXP;
            if (check.test(name)) {
                return res.status(400).json({ message: INCORECT_CHARTS });
            }
            node.name = name;
        }
        node.gender = gender || node.gender;
        node.birthday = birthday || node.birthday;
        node.birthplace = birthplace || node.birthplace;
        node.isLife = isLife || node.isLife;
        node.email = email || node.email;
        node.familyStatus = familyStatus || node.familyStatus;
        node.relationType = relationType || node.relationType;
        //
        // if (parentId && (position || position === 0)) {
        //   const column = await Column.findById(parentId);
        //
        //   if (!column) {
        //     return res.status(404).json({ message: COLUMN_NOT_FOUND });
        //   }
        //
        //   if (position > column.nodes.length || position < 0) {
        //     return res.status(400).json({ message: INCORECT_POSITION });
        //   }
        //
        //   const pasteNode = {
        //     $push: {
        //       nodes: {
        //          $each: [ id ],
        //          $position: position
        //       }
        //     }
        //   };
        // const deleteNode = {
        //   $pull: { nodes: id }
        // };
        //
        // const outsideColumn = (prevColumn.toString() === currentColumn.toString())
        // ? { _id: currentColumn }
        // : { _id: prevColumn };
        //
        // const insideColumn = { _id: currentColumn };
        //
        // await Column.findOneAndUpdate(outsideColumn, deleteNode).catch((e) => e);
        //
        // await Column.findOneAndUpdate(insideColumn, pasteNode).catch((e) => e);
        node.parentId = parentId || node.parentId;
        // }
        await node.save();
        // const updatedNode: INode = await Node.findById(id).populate('users');
        //
        // updatedNode.users.map((user: IUser) => {
        //   user.password = undefined;
        //   // user.boards = undefined;
        //   user.notifications = undefined;
        // });
        return res.status(201).json(node);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const DeleteNode = async (req, res) => {
    try {
        const node = await Node_1.default.findByIdAndDelete(req.params.id);
        if (!node) {
            return res.status(404).json({ message: NODE_NOT_FOUND });
        }
        //
        // await Column.updateOne(
        //   { _id: node.parentId },
        //   { $pull: { nodes: req.params.id } }
        // );
        return res.status(201).json({ message: NODE_DELETED });
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
const GetNodes = async (req, res) => {
    try {
        const nodes = await Node_1.default.find();
        return res.status(201).json(nodes);
    }
    catch (e) {
        return res.status(500).json({ message: RANDOM_ERROR });
    }
};
exports.default = {
    CreateNode,
    GetNode,
    UpdateNode,
    DeleteNode,
    GetNodes,
};
