
import { Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from '../types/types';
import { container } from '..';

const authRequired = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {    
    try{
        const token = req.cookies.token;

        if(token === null || typeof token !== "string") return res.status(401).json({ error: "Invalid token" })
        
        let jwtVerification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload
    
        let user = await container.userRepository.getUserById(jwtVerification.id)
    
        if(!user){
            return res.status(401).json({ error: "You must be logged in" })
        }
        req.user = user
        next()
    }
    catch(e){
        console.log(e)
        res.status(500).json({ error: "Something went wrong try again" })
    }
   
}

export default authRequired