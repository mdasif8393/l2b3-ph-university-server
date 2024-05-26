import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Running PH University server',
  });
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
