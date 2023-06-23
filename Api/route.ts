import express from "express";
import { sanitizeValueInTextDocument } from '../helpers/textDocumentHelpers';
import { check } from 'express-validator';
import authRequired from "../middleware/authRequired";
import UserController from "./UserController";
import TextDocumentController from "./TextDocumentController";
import multer from 'multer';

const upload = multer({ dest: 'uploads/', storage: multer.memoryStorage() });

export function userRoutes(userController: UserController, textDocumentController: TextDocumentController) {
  const router = express.Router()

  const userSanitize = [
    check('username').isString().isLength({ min: 3 }).trim().escape(),
    check('password').isString().isLength({ min: 8 }).trim().escape(),
  ]

  const userSanitizeWithEmail = [
    check('email').isEmail().isLength({ min: 3 }).trim().escape(),
    check('password').isString().isLength({ min: 8 }).trim().escape(),
  ]

  const titleTextDocument = [
    check('title').isString().isLength({ min: 1, max: 128 }).trim().escape(),
  ]

  const text = [
    check('text').isString().customSanitizer(sanitizeValueInTextDocument)
  ]

 

  const textDocumentSanitize = [...titleTextDocument, ...text]

  ///AUTH
  router.route("/user/google/auth").get(userController.apiGoogleSignUp.bind(userController))
  router.route("/user/cookie").delete(userController.apiLogOut.bind(userController))
  router.route("/user/google/callback").get(userController.apiGoogleCallback.bind(userController))
  router.route("/user/username/login").post(userSanitize, userController.apiUsernameLoginIn.bind(userController))
  router.route("/user/username/signUp").post(userSanitize, userController.apiUsernameSignUp.bind(userController))
  router.route("/user/email/login").post(userSanitizeWithEmail, userController.apiEmailLoginIn.bind(userController))
  router.route("/user/email/signup").post(userSanitizeWithEmail, userController.apiEmailSignUp.bind(userController))
  router.route("/user/data").get(authRequired, userController.apiGetUserProfileData.bind(userController))
  router.route("/textDocument").post(authRequired, textDocumentSanitize, textDocumentController.apiCreateTextDocument.bind(textDocumentController))
  router.route("/textDocument/id/:textDocumentId").get(authRequired, textDocumentController.apiGetTextDocumentById.bind(textDocumentController))
  router.route("/textDocument/id/:textDocumentId").delete(authRequired, textDocumentController.apiDeleteTextDocument.bind(textDocumentController))
  router.route("/textDocument").get(authRequired, textDocumentController.apiGetTextsDocuments.bind(textDocumentController))
  router.route("/textDocument/templates").get(textDocumentController.apiGetTextDocumentTemplates.bind(textDocumentController))
  router.route("/textDocument/title/id/:textDocumentId").patch(authRequired, titleTextDocument, textDocumentController.apiUpdateTitleTextDocument.bind(textDocumentController))
  router.route("/textDocument/text/id/:textDocumentId").patch(authRequired, text, textDocumentController.apiUpdateTextOfTextDocument.bind(textDocumentController))
  router.route("/textDocument/image").post(authRequired, upload.single('image'), textDocumentController.apiPostImage.bind(textDocumentController))
  router.route("/textDocument/purify").post(textDocumentSanitize, textDocumentController.apiPurifyDocument.bind(textDocumentController))
  return router

}