import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose';
import Debug from 'debug';
import dotenv from 'dotenv';
import { MONGO_URI, MONGO_OPTIONS } from './config';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../swagger.json');

dotenv.config();

const debug = Debug('file-manager:server');

import { default as baseRouter } from './routes';

// Connect Database
mongoose
  .connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => debug('MongoDB Connected Successfully'))
  .catch(err => debug(err.message));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', baseRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

export default app;
