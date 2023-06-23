import { Request } from "express"
import { IUser } from "../Schemas/userModel";
import { IAuthRepository } from "../InterfacesRepositories/IAuthRepository";
import ITextDocumentRepository from "../InterfacesRepositories/ITextDocumentRepository";
import { IGoogleAuthRepository } from "../InterfacesRepositories/IGoogleAuthRepository";


export interface IGetUserAuthInfoRequest extends Request {
  user?: IUser // or any other type
}

export interface DependenciesContainer {
  userRepository: IAuthRepository;
  textDocumentRepository: ITextDocumentRepository;
  googleRepository: IGoogleAuthRepository
}

export type Message = {
  channel_id: number
  date_of_posting: string
  edited_on: string|null
  id: string
  message_text: string
  user_id: number
  username: string
  emojis: EmojiInfo
}

export type EmojiInfo = {
  [name: string]: EmojiReactionInfo[]
}

export type EmojiReactionInfo = {
  username: string;
  userId: string;  
}


export enum EmojiReaction {
  agree = "👍",
  disagree = "👎",
  loveIt = "😍",
  supperFunny = "😂",
  bigCry= "😭"
}

export type FriendUser = {
  user_one_id: string,
  user_two_id: string,
  start_of_friendship: string,
  username: string,
  isOnline: boolean
} 

export type FriendInvites = {
    id: string,
    invite_date: string,
    seen_by_user_invited: boolean,
    user_invited_id: string,
    user_inviting_id: string,
    username: string,
} 

export type FriendShip = {
  start_of_friendship: string,
  user_one_id: string,
  user_two_id: string,
  username_one: string,
  username_two: string,
  is_user_one_online: boolean,
  is_user_two_online: boolean
}