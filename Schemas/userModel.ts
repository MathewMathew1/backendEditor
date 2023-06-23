import { Schema, model } from 'mongoose';
import { Exclude } from 'class-transformer';

interface IUser {
    _id: string
    username?: string;
    email?: string;
    password?: string
    google?: {
        id: string
    }
    createdAt: string;
}

class UserDto {
    _id: string
    username?: string
    email?: string
    google?: {
        id: string
    }
    createdAt: string;
    constructor(data: IUser) {
        this._id = data._id;
        this.username = data.username;
        this.email = data.email;
        this.google = data.google
        this.createdAt = data.createdAt
    }
}

const userSchema = new Schema({
    google: {
        id: {
            type: String,
            required: false,
            sparse: true,
        }
    },
    username: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    emailConfirmed: {
        type: Boolean,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

},{ versionKey: false });



const User = model<IUser>('User', userSchema, "user");
export {userSchema, User, IUser, UserDto }