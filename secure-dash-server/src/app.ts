// app.ts
import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const App = express();

App.use(morgan('dev'));
App.use(helmet());
App.use(cors());
App.use(express.json());

// Define a route for the root URL
App.get('/', (req, res) => {
  res.send('Hello World!');
});

// Other routes here

// This middleware should be after all route declarations
App.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// Error handling middleware
App.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error fetching user:', error);
  let errorMessage = 'An unknown Error occurred';
  let statusCode = 500;
  if (error instanceof createHttpError.HttpError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default App;
