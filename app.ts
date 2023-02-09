import express, { Request, Response, Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import connect from './connect';
import { HttpException } from './exceptions/HttpExpection';
import authRouter from './routes/users';

const app: Application = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);

app.use((req: Request, res: Response) => {
  res.json({
    statusCode: 404,
  });
});

app.use( (err: HttpException, req: Request, res: Response) => {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});

const uri = process.env.MONGODB_URI || 'mongodb+srv://rsclone:Rsclone_23@cluster0rsclone.ncyuk33.mongodb.net/?retryWrites=true&w=majority';

connect({ uri });

export default app;
