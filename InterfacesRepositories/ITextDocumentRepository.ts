import { ITextDocument as TextDocument } from "../Schemas/textDocumentModel";

export default interface ITextDocumentRepository {
  creteTextDocument(userId: string, text: string, title: string): Promise<TextDocument>;
  getTextDocument(id: string): Promise<TextDocument | null>;
  getTextDocuments(userId: string): Promise<TextDocument[]>;
  updateTitleOfTextDocument(userId: string, textDocumentId: string, title: string): Promise<TextDocument | null>;
  updateTextOfTextDocument(userId: string, textDocumentId: string, text: string): Promise<TextDocument | null>;
  deleteTextDocument(id: string, userId: string): Promise<number>
}