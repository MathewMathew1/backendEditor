import { IImageStorage } from "../InterfacesRepositories/IImageStorageRepository";
import fetch from "node-fetch";

export default class ImgurImageStorageRepository implements IImageStorage {
    clientId: string
    constructor() {
      this.clientId = process.env.IMGUR_CLIENT_ID!
    }
  
    async uploadImage(imagePath: string): Promise<string> {
      const apiUrl = 'https://api.imgur.com/3/upload';
  
      try {
        const formData = new URLSearchParams();
        formData.append('image', imagePath);
        formData.append('type', "base64");
    
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: `Client-ID ${this.clientId}`,
          
          },
          body: formData,
        });
      
        if (response.ok) {
          const data = await response.json();
          return data.data.link;
        }
  
        throw new Error('Image upload failed.');
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed.');
      }
    }
  }
  
  // Example usage
