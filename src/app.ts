import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import createHttpError from 'http-errors';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// client error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Route not found'));
});

// Server error handling middleware
// app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
//   return res.status(err.status || 500).json({
//     success: false,
//     message: err.message,
//   });
// });

export default app;
