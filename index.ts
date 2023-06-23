


import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { userRoutes } from './Api/route';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import { DependenciesContainer } from './types/types';

import UserController from './Api/UserController';
import MongooseAuthRepository from './Repositories/MongooseAuthRepository';
import GoogleAuthRepository from './Repositories/GoogleAuthRepository';
import TextDocumentController from './Api/TextDocumentController';
import TextDocumentRepository from './Repositories/TextDocumentRepository';
import cors from "cors";

const app = express()
const PORT = process.env.PORT || 3000 

const userRepository = new MongooseAuthRepository()
//const googleRepository = new GoogleAuthRepository()
const textDocumentRepository = new TextDocumentRepository()

//const userController = new UserController(userRepository, googleRepository);
const textDocumentController = new TextDocumentController(textDocumentRepository);

/*export const container: DependenciesContainer = {
    userRepository: userRepository,
    textDocumentRepository: textDocumentRepository,
    googleRepository: googleRepository
};*/
try{
  dotenv.config()
  
  const env = process.env.NODE_ENV

  console.log({PORT})
  // view engine setup
  if(env!== 'production'){
    app.use(cors({origin: ["http://localhost:8000","https://socket.io"], credentials: true}))
  }
  else{
    app.use(cors({origin: ["https://socket.io", "https://oliphant.netlify.app"], credentials: true}))
  }

  app.use(logger('dev'));
  app.use(express.json())
  app.use(bodyParser.json({limit: "800mb"}))
  app.use(bodyParser.urlencoded({ limit: '800mb', extended: true }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/healthCheck", (_req, res) => res.status(200).json({healthy: "healthy"}))
  //app.use("/api/v1/", userRoutes(userController, textDocumentController))
  app.use("*", (_req, res) => res.status(404).json({error: "Not found"}))

  mongoose.connect(process.env.MONGO_URI!,{connectTimeoutMS: 5000,})
    .then(async client =>{
      
      app.listen(PORT, () => {
          console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
      })
    }).catch((error) => {
      console.error('Error connecting to MongoDB', error);
    });

  //app.use(logger(':method :url :status :response-time ms - :remote-addr'));
  // error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    
  });
}catch(e){
  console.log(e)
}

export default app;
