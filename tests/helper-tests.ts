import { ITextDocument } from "../Schemas/textDocumentModel";
import { IUser } from "../Schemas/userModel";

export const createRandomUser = (): IUser => {
    const id = Math.random().toString(36).substr(2, 9); // generate a random string as ID
    const usernames = ["johndoe", "janedoe", "smith", "jennifer", "peter"]; // array of possible usernames
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)]; // select a random username
    const randomEmail = `${randomUsername}@example.com`; // generate an email based on the username
    const randomPassword = Math.random().toString(36).substr(2, 8); // generate a random password
    const randomGoogleId = Math.random().toString(36).substr(2, 9); // generate a random Google ID
    const createdAt = new Date().toISOString(); // generate a timestamp for createdAt field
  
    const randomUser: IUser = {
      _id: id,
      username: randomUsername,
      email: randomEmail,
      password: randomPassword,
      google: {
        id: randomGoogleId
      },
      createdAt: createdAt
    };
  
    return randomUser;
  }

  export const createRandomTextDocument = (): ITextDocument => {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const title = "Document " + Math.floor(Math.random() * 100);
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, nibh eget efficitur sagittis, sem risus venenatis felis, ac ullamcorper sapien neque vel mi. Nam auctor sem ut purus luctus, vel finibus turpis euismod.";
    const lastUpdatedAt = new Date(Date.now()).toISOString();
    const createdAt = new Date(Date.now()).toISOString();
    
    const randomTextDocument: ITextDocument = {
      _id: id,
      userId: userId,
      title: title,
      text: text,
      lastUpdatedAt: lastUpdatedAt,
      createdAt: createdAt
    };
    
    return randomTextDocument;
  }