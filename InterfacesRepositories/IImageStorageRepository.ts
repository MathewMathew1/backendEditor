export interface IImageStorage {
    uploadImage(imagePath: string): Promise<string>;
}
  
