import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/types';
import { validationResult } from 'express-validator';
import ITextDocumentRepository from '../InterfacesRepositories/ITextDocumentRepository';
import templates from '../helpers/Templates';
import { IImageStorage } from '../InterfacesRepositories/IImageStorageRepository';
import ImgurImageStorageRepository from '../Repositories/ImgurImageStorageRepository';

export default class TextDocumentController {
    private readonly textDocumentRepository: ITextDocumentRepository;
    private readonly imageStorageRepository: IImageStorage;
    
    constructor(textDocumentRepository: ITextDocumentRepository) {
      this.textDocumentRepository = textDocumentRepository
      this.imageStorageRepository = new ImgurImageStorageRepository()
    }

    async apiCreateTextDocument(req: IGetUserAuthInfoRequest, res: Response){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const text: string = req.body.text
            const title: string = req.body.title
            const user = req.user    
            
            let textDocument = await this.textDocumentRepository.creteTextDocument(user!._id, text, title)
            res.status(201).json({status: "success", textDocument})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiGetTextDocumentById(req: IGetUserAuthInfoRequest, res: Response){
        try{
 
            const textDocumentId = req.params.textDocumentId          
            const user = req.user       
            if(typeof textDocumentId!=="string") return res.status(400).json({ error: "Missing none optional query argument textDocumentId" })
            
            let textDocument = await this.textDocumentRepository.getTextDocument(textDocumentId)
          
            if(textDocument===null || textDocument.userId!== user?._id.toString()) return res.status(404).json({error: "Text document not found" })
            console.log(textDocument)
            res.status(201).json({status: "success", textDocument})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiDeleteTextDocument(req: IGetUserAuthInfoRequest, res: Response){
        try{
 
            const textDocumentId = req.params.textDocumentId          
            const user = req.user       
            if(typeof textDocumentId!=="string") return res.status(400).json({ error: "Missing none optional query argument textDocumentId" })
            
            let deletionCount = await this.textDocumentRepository.deleteTextDocument(textDocumentId, user!._id)
          
            if(deletionCount===0) return res.status(404).json({error: "Text document not found or you have no rights to delete it" })

            res.status(201).json({status: "success"})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiGetTextsDocuments(req: IGetUserAuthInfoRequest, res: Response){
        try{   
            const user = req.user       
            
            let textDocuments = await this.textDocumentRepository.getTextDocuments(user!._id)
            
            res.status(201).json({status: "success", textDocuments})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiUpdateTitleTextDocument(req: IGetUserAuthInfoRequest, res: Response){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            
            const title: string = req.body.title
            const textDocumentId = req.params.textDocumentId          
            const user = req.user       
            if(typeof textDocumentId!=="string") return res.status(400).json({ error: "Missing none optional query argument textDocumentId" })        
            
            let updatedTextDocument = await this.textDocumentRepository.updateTitleOfTextDocument(user!._id, textDocumentId, title)
            if(updatedTextDocument===null) return res.status(404).json({error: "Text document not found" })

            res.status(201).json({status: "success", updatedTextDocument})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiUpdateTextOfTextDocument(req: IGetUserAuthInfoRequest, res: Response){
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            
            const text: string = req.body.text
            console.log(text)
            const textDocumentId = req.params.textDocumentId          
            const user = req.user       
            if(typeof textDocumentId!=="string") return res.status(400).json({ error: "Missing none optional query argument textDocumentId" })        
            
            let updatedTextDocument = await this.textDocumentRepository.updateTextOfTextDocument(user!._id, textDocumentId, text)
            
            if(updatedTextDocument===null) return res.status(404).json({error: "Text document not found" })

            res.status(201).json({status: "success", updatedTextDocument})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiGetTextDocumentTemplates(req: IGetUserAuthInfoRequest, res: Response){
        try{
            res.status(201).json({status: "success", templates: templates})
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: "Something went wrong try again" })
        }
    }

    async apiPostImage(req: IGetUserAuthInfoRequest, res: Response){
        try {

            if (!req.file) {
              res.status(400).json({ error: 'No image file provided' });
              return;
            }
            
            const imageData = req.file.buffer.toString('base64')
            // Upload the image to Imgur
            const imageLink = await this.imageStorageRepository.uploadImage(imageData);
        
            // Respond with the image link
            res.json({ link: imageLink });
          } catch (error) {
            console.error('Failed to upload image:', error);
            res.status(500).json({ error: 'Failed to upload image' });
          }
    }

    async apiPurifyDocument(req: IGetUserAuthInfoRequest, res: Response){
        try {
            const text: string = req.body.text
            //text is purified in middleware
            res.json({ text: text });
          } catch (error) {
            console.error(error)
            res.status(500).json({ error:"Something went wrong try again" });
          }
    }
}
