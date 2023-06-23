import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { userRoutes } from './Api/route';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { DependenciesContainer } from './types/types';

import UserController from './Api/UserController';

import GoogleAuthRepository from './Repositories/GoogleAuthRepository';
import TextDocumentController from './Api/TextDocumentController';

import cors from "cors";

// Create an Express application
const app = express();

// Define a route handler for the root path
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000; 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
