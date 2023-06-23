import jwt from "jsonwebtoken";
import { User } from "../Schemas/userModel";
import { IAuthRepository } from "../InterfacesRepositories/IAuthRepository";

export default class MongooseAuthRepository implements IAuthRepository {

    async getUserByGoogleId(id: string) {
        const user = await User.findOne({"google.id": id})
        return user
    }

    async createGoogleUser(passedData: any) {
        try {
            const user = new User({
                google: {id: passedData.id},
                email: passedData.email,
            });
            await user.save()
            return user
        }catch (error) {
            throw error;
        }
    }

    async createUsernameUser(hashedPassword: string, username: string) {
        const user = new User({
            username: username,
            password: hashedPassword,
        })
        await user.save()
        return user
    }

    async createEmailUser(hashedPassword: string, email: string) {
        const user = new User({
            email: email,
            password: hashedPassword,
            emailConfirmed: false
        });
        await user.save()
        return user
    }

    async getUserByUsername(username: string) {
        const user = await User.findOne({"username": username})
        return user
    }

    async getUserByEmail(email: string) {
        const user = await User.findOne({"email": email})
        return user
    }

    async getUserById(id: string) {
        const user = await User.findById({ _id: id })
        return user
    }

    async createToken(id: string) {
        const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET!)
        return accessToken;
    }


}