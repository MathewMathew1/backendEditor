import { Schema, model } from 'mongoose';

interface ITextDocument {
    _id: string
    userId: string;
    title: string;
    text: string
    lastUpdatedAt: string
    createdAt: string;
}

const textDocumentSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

},{ versionKey: false });



const TextDocument = model<ITextDocument>('textDocument', textDocumentSchema, "textDocument");
export {textDocumentSchema, TextDocument, ITextDocument }