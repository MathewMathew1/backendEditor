import mongoose from "mongoose";
import { TextDocument } from "../Schemas/textDocumentModel";
import { ObjectId } from "mongodb";
import ITextDocumentRepository from "../InterfacesRepositories/ITextDocumentRepository";

export default class TextDocumentRepository implements ITextDocumentRepository {
    async injectDB() {
        try{
          
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in googleDAO` + e
            )
        } 
    }

    async creteTextDocument(userId: string, text: string, title: string) {
        const textDocument = new TextDocument({
            userId: userId,
            text: text,
            title: title
        });
        await textDocument.save()
        return textDocument
    }

    async getTextDocument(id: string) {
        const textDocument = await TextDocument.findById({ _id: id })
        return textDocument
    }

    async deleteTextDocument(id: string, userId: string) {
        const deleteResult = await TextDocument.deleteOne({ _id: id, userId: userId})
        return deleteResult.deletedCount
    }

    async getTextDocuments(userId: string) {
        const textDocuments = await TextDocument.find({"userId": userId})
        return textDocuments
    }

    async updateTitleOfTextDocument(userId: string, textDocumentId: string, title: string) {
        const updatedObj = await TextDocument.findOneAndUpdate(
            { _id: new ObjectId(textDocumentId), userId: userId },
            { "title": title }
        );
        return updatedObj
    }

    async updateTextOfTextDocument(userId: string, textDocumentId: string, text: string) {
        const updatedObj = await TextDocument.findOneAndUpdate(
            { _id: new ObjectId(textDocumentId), userId: userId },
            { "text": text}
        );
        return updatedObj
    }

}