import { Request, Response } from 'express';
import User, {IUser} from '../models/User';
import Node, {INode} from '../models/Node';
import global from '../variables';

const {
  RANDOM_ERROR
} = global;

const GetUserData = async (req: Request, res: Response) => {
  try {
    let user: IUser = await User.findById(req.params.id);
    user.password = undefined;
    user.nodes = await Node.find();

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: RANDOM_ERROR });
  }
};

const GetUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    let user: IUser = await User.findById(userId);
    user.password = undefined;
    user.nodes = await Node.find();//nodes: INode[];

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: RANDOM_ERROR });
  }
};

const GetUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();

    return res.status(201).json(users);
  } catch (e) {
    return res.status(500).json({ message: RANDOM_ERROR });
  }
};

export default {
  GetUser,
  GetUserData,
  GetUsers
};
