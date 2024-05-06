import express, { NextFunction, Request, Response } from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';

dotenv.config();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define a route for the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Other routes here
// Mount the router on the app
app.use('/', router);

// This middleware should be after all route declarations
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error fetching user:', error);
  let errorMessage = 'An unknown Error occurred';
  let statusCode = 500;
  if (error instanceof createHttpError.HttpError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  res.status(statusCode).json({ error: errorMessage });
});


export default app;
