import { Router } from 'express';
import auth from '../middleware/auth.middleware';
import NodeController from '../controllers/node.controller';

const nodesRouter = Router();

nodesRouter.post('/', auth, NodeController.CreateNode);

nodesRouter.get('/', auth, NodeController.GetNodes);

nodesRouter.get('/:id', auth, NodeController.GetNode);

nodesRouter.put('/:id', auth, NodeController.UpdateNode);

nodesRouter.delete('/:id', auth, NodeController.DeleteNode);

export default nodesRouter;
