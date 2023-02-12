import { Request, Response } from 'express';
import User, {IUser} from '../models/User';
import global from '../variables';

const {
  RANDOM_ERROR
} = global;

const GetUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const user: IUser = await User.findById(userId);
    
    user.password = undefined;

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: RANDOM_ERROR });
  }
};

const GetUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({}, '_id, fullName, email, trees');

    return res.status(201).json(users);
  } catch (e) {
    return res.status(500).json({ message: RANDOM_ERROR });
  }
};

export default {
  GetUserData,
  GetUsers
};
