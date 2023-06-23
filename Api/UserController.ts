import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import { IAuthRepository } from '../InterfacesRepositories/IAuthRepository';
import { IGoogleAuthRepository } from '../InterfacesRepositories/IGoogleAuthRepository';
import { IGetUserAuthInfoRequest } from '../types/types';
import { UserDto } from '../Schemas/userModel';

export default class UserController {
    private readonly userRepository: IAuthRepository;
    private readonly googleRepository: IGoogleAuthRepository;
    
    constructor(userRepository: IAuthRepository, googleRepository: IGoogleAuthRepository) {
      this.userRepository = userRepository
      this.googleRepository = googleRepository
    }

    async apiGoogleSignUp(req: Request, res: Response){
        try{
          const link = await this.googleRepository.getAuthUrl()
          return res.status(201).json({link: link})
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ error: "Something went wrong try again" })
        }
    }


    async apiGoogleCallback(req: Request, res: Response){
        
      try {
        const { code } = req.query;

        if (typeof code!=="string") {
          return res.status(400).send('Authorization code not found.');
        }
        const tokens = await this.googleRepository.getAccessToken(code)
       
        const profiles = await this.googleRepository.getUserProfile(tokens)

        const googleUser = await this.userRepository.getUserByGoogleId(profiles.id)

        let accessToken
        if(!googleUser){
          const userCreated = await this.userRepository.createGoogleUser(profiles)
          accessToken = await this.userRepository.createToken(userCreated._id)
        }else{
          accessToken = await this.userRepository.createToken(googleUser._id)
        }
        let expireData = new Date();

        // Set the date to 5 years in the future
        expireData.setTime(expireData.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));

        // Convert the date to a UTC string format
        let redirectPage = req.app?.get('env') !== 'production'? 'http://localhost:8000/': 'http://localhost:8000/'
        res.cookie('token', accessToken, { httpOnly: true, expires: expireData, sameSite: "none", secure: true})
        res.redirect(redirectPage);
      }
      catch (e) {
        console.error(e);
        res.status(500).send({error: 'Server error'});
      }
    }

    async apiUsernameSignUp(req: Request, res: Response){
      try{
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              return res.status(400).json({ error: errors.array() });
          }
          const username: string = req.body.username
          const password: string = req.body.password
              
          let salt: number = process.env.BCRYPT_SALT!==undefined? parseInt(process.env.BCRYPT_SALT): 8
          const hashedPassword = await bcrypt.hash(password, salt)
          
          await this.userRepository.createUsernameUser(hashedPassword, username)

          res.status(201).json({status: "success"})
      }
      catch (e) {
        console.log(e)
        if (e.code === 11000) {
          return res.status(400).json({ error: 'Username already exists.' });
        }
        res.status(500).json({ error: "Something went wrong try again" })
      }
    }

    async apiUsernameLoginIn(req: Request, res: Response){
      try{
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({ error: errors.array() });
          }

          const username = req.body.username
          const password = req.body.password
          
          let user = await this.userRepository.getUserByUsername(username)
          
          if(!user || !user.password) return res.status(400).json({error: "Incorrect password or username" })

          const correctPassword = await bcrypt.compare(password, user.password)
          if(!correctPassword) return res.status(400).json({error: "Incorrect password or username" })
          let expireDate = new Date();

          // Set the date to 5 years in the future
          expireDate.setTime(expireDate.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));

          const accessToken = await this.userRepository.createToken(user._id)
          res.cookie('token', accessToken, { httpOnly: true, expires: expireDate, sameSite: "none", secure: true});
          res.status(201).json({status: "success"})
      }
      catch (e) {
          console.log(e)
          res.status(500).json({ error: "Something went wrong try again" })
        }
  }

  async apiEmailSignUp(req: Request, res: Response){
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const email: string = req.body.email
        const password: string = req.body.password
            
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT!))
        
        await this.userRepository.createEmailUser(hashedPassword, email)

        res.status(201).json({status: "success"})
    }
    catch (e) {
      console.log(e)
      if (e.code === 11000) {
        return res.status(400).json({ error: 'Email already taken.' });
      }
      res.status(500).json({ error: "Something went wrong try again" })
    }
  }

  async apiEmailLoginIn(req: Request, res: Response){
    try{

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
    
        const email = req.body.email
        const password = req.body.password
        
        let user = await this.userRepository.getUserByEmail(email)
    
        if(!user || !user.password) return res.status(400).json({error: "Incorrect password or email" })
  
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword) return res.status(400).json({error: "Incorrect password or email" })

        let expireDate = new Date();
        // Set the date to 5 years in the future
        expireDate.setTime(expireDate.getTime() + (5 * 365 * 24 * 60 * 60 * 1000));
        const accessToken = await this.userRepository.createToken(user._id)

        res.cookie('token', accessToken, { httpOnly: true, expires: expireDate, sameSite: "none", secure: true});
        return res.status(201).json({status: "success"})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Something went wrong try again" })
      }
  }

  async apiLogOut(req: Request, res: Response){
    try{
        res.clearCookie('token', { httpOnly: true });
        return res.status(201).json({status: "success"})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Something went wrong try again" })
      }
  }

  async apiGetUserProfileData(req: IGetUserAuthInfoRequest, res: Response){
    try{

        let user = req.user!
        const userDto = new UserDto(user)
        return res.status(201).json({userData: userDto})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Something went wrong try again" })
      }
  }
}