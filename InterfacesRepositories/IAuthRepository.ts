import { IUser as User } from "../Schemas/userModel";

export interface IAuthRepository {
    getUserByGoogleId(id: string): Promise<User | null>;
    createGoogleUser(passedData: any): Promise<User>;
    createUsernameUser(hashedPassword: string, username: string): Promise<User>;
    createEmailUser(hashedPassword: string, email: string): Promise<User>;
    getUserByUsername(username: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: string): Promise<User | null>;
    createToken(id: string): Promise<string>;
}