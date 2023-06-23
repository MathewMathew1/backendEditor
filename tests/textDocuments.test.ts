import { expect } from 'chai';
import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import sinon from 'sinon';
import { createRandomTextDocument, createRandomUser } from './helper-tests';
import sinonChai from 'sinon-chai';
import dotenv from "dotenv"
import ITextDocumentRepository from '../InterfacesRepositories/ITextDocumentRepository';
import TextDocumentController from '../Api/TextDocumentController';
import { IGetUserAuthInfoRequest} from '../types/types';

chai.use(sinonChai)
dotenv.config()

describe("textDocumentController", () => {
    let textDocumentRepositoryStub= <sinon.SinonStubbedInstance<ITextDocumentRepository>>{}
    
    describe("apiCreateTextDocument", () => {
        const sandbox = sinon.createSandbox();
        textDocumentRepositoryStub.creteTextDocument = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq() as IGetUserAuthInfoRequest;
        const res = mockRes({
            json: sinon.spy(),
            cookie: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        });
       
        it("Should return 201 with created textDocument", async () => {
          // Arrange
          const userCreated = createRandomUser()
          req.user = userCreated
          req.body = {title: "title", text: "text"}
          const textDocument = createRandomTextDocument()
          textDocumentRepositoryStub.creteTextDocument.resolves(textDocument)
          
          // Act
        
          let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
          
          await controller.apiCreateTextDocument(req,res)
          // Assert
          // Is res.json called and passed the string from the Promise.resolve above.

          expect(res.status).to.have.been.calledWith(201);
          expect(statusJsonSpy.args[0][0].textDocument).to.deep.equal(textDocument);
        });
    })
    describe("apiDeleteDocument", () => {
      const sandbox = sinon.createSandbox();
      textDocumentRepositoryStub.deleteTextDocument = sandbox.stub()
      afterEach(function () {
          sinon.restore();
          sandbox.restore();
      });
      
      const statusJsonSpy = sinon.spy();
      const req = mockReq() as IGetUserAuthInfoRequest;
      const res = mockRes({
          json: sinon.spy(),
          cookie: sinon.spy(),
          status: sinon.stub().returns({ json: statusJsonSpy })
      });
     
      it("Should return 201 When document exist", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.params.textDocumentId = "1"

        textDocumentRepositoryStub.deleteTextDocument.resolves(1)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiDeleteTextDocument(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(201);
      });
      it("Should return 404 When document doesnt exist", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.params.textDocumentId = "1"

        textDocumentRepositoryStub.deleteTextDocument.resolves(0)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiDeleteTextDocument(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(404);
      });
  })
    describe("apiGetTextDocumentById", () => {
      const sandbox = sinon.createSandbox();
      textDocumentRepositoryStub.getTextDocument = sandbox.stub()
      afterEach(function () {
          sinon.restore();
          sandbox.restore();
      });
      
      const statusJsonSpy = sinon.spy();
      const req = mockReq() as IGetUserAuthInfoRequest;
      const res = mockRes({
          json: sinon.spy(),
          cookie: sinon.spy(),
          status: sinon.stub().returns({ json: statusJsonSpy })
      });
     
      it("Should return document with 201 status if exist and user requesting can access it", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.params.textDocumentId = "1"
        const textDocument = createRandomTextDocument()
        textDocument.userId  = userCreated._id
        textDocumentRepositoryStub.getTextDocument.resolves(textDocument)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiGetTextDocumentById(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(201);
        expect(statusJsonSpy.args[0][0].textDocument).to.deep.equal(textDocument);
      });

      it("Should return 404 status if document not found", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.params.textDocumentId = "1"
        textDocumentRepositoryStub.getTextDocument.resolves(null)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiGetTextDocumentById(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(404);
   
      });
      it("Should return 404 status if user not allowed to view document", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.user._id = "Wrong"
        req.params.textDocumentId = "1"
        const textDocument = createRandomTextDocument()
        textDocument.userId  = "Good"
        textDocumentRepositoryStub.getTextDocument.resolves(textDocument)
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiGetTextDocumentById(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(404);
   
      });
      
      })  
      describe("apiGetTextsDocuments", () => {
        const sandbox = sinon.createSandbox();
        textDocumentRepositoryStub.getTextDocuments = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq() as IGetUserAuthInfoRequest;
        const res = mockRes({
            json: sinon.spy(),
            cookie: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        });
       
        it("Should return document with 201 with documents", async () => {
          // Arrange
          const userCreated = createRandomUser()
          req.user = userCreated
          req.params.textDocumentId = "1"
          const allDocuments = [createRandomTextDocument(), createRandomTextDocument()]
          textDocumentRepositoryStub.getTextDocuments.resolves(allDocuments)
          
          // Act
        
          let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
          
          await controller.apiGetTextsDocuments(req,res)
          // Assert
          // Is res.json called and passed the string from the Promise.resolve above.
  
          expect(res.status).to.have.been.calledWith(201);
          expect(statusJsonSpy.args[0][0].textDocuments).to.deep.equal(allDocuments);
        });
    })
    describe("apiUpdateTitleTextDocument", () => {
      const sandbox = sinon.createSandbox();
      textDocumentRepositoryStub.updateTitleOfTextDocument = sandbox.stub()
      afterEach(function () {
          sinon.restore();
          sandbox.restore();
      });
      
      const statusJsonSpy = sinon.spy();
      const req = mockReq() as IGetUserAuthInfoRequest;
      const res = mockRes({
          json: sinon.spy(),
          cookie: sinon.spy(),
          status: sinon.stub().returns({ json: statusJsonSpy })
      });
     
      it("Should return document with 201 with document", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.body = {text: "text"}
        req.params.textDocumentId = "1"
        const textDocument = createRandomTextDocument()
        textDocumentRepositoryStub.updateTitleOfTextDocument.resolves(textDocument)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiUpdateTitleTextDocument(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(201);
        expect(statusJsonSpy.args[0][0].updatedTextDocument).to.equal(textDocument);
      });
      it("Should return 404 if no document is updated", async () => {
        // Arrange
        const userCreated = createRandomUser()
        req.user = userCreated
        req.body = {text: "text"}
        req.params.textDocumentId = "1"
        textDocumentRepositoryStub.updateTitleOfTextDocument.resolves(null)
        
        // Act
      
        let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
        
        await controller.apiUpdateTitleTextDocument(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.

        expect(res.status).to.have.been.calledWith(404);
      });
  })
  describe("apiUpdateTextOfTextDocument", () => {
    const sandbox = sinon.createSandbox();
    textDocumentRepositoryStub.updateTextOfTextDocument = sandbox.stub()
    afterEach(function () {
        sinon.restore();
        sandbox.restore();
    });
    
    const statusJsonSpy = sinon.spy();
    const req = mockReq() as IGetUserAuthInfoRequest;
    const res = mockRes({
        json: sinon.spy(),
        cookie: sinon.spy(),
        status: sinon.stub().returns({ json: statusJsonSpy })
    });
   
    it("Should return document with 201 with document", async () => {
      // Arrange
      const userCreated = createRandomUser()
      req.user = userCreated
      req.body = {text: "text"}
      req.params.textDocumentId = "1"
      const textDocument = createRandomTextDocument()
      textDocumentRepositoryStub.updateTextOfTextDocument.resolves(textDocument)
      
      // Act
    
      let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
      
      await controller.apiUpdateTextOfTextDocument(req,res)
      // Assert
      // Is res.json called and passed the string from the Promise.resolve above.

      expect(res.status).to.have.been.calledWith(201);
      expect(statusJsonSpy.args[0][0].updatedTextDocument).to.deep.equal(textDocument);
    });
    it("Should return 404 if no document is updated", async () => {
      // Arrange
      const userCreated = createRandomUser()
      req.user = userCreated
      req.params.textDocumentId = "1"
      req.body = {text: "text"}
      textDocumentRepositoryStub.updateTextOfTextDocument.resolves(null)
      
      // Act
    
      let controller: TextDocumentController = new TextDocumentController(textDocumentRepositoryStub)
      
      await controller.apiUpdateTextOfTextDocument(req,res)
      // Assert
      // Is res.json called and passed the string from the Promise.resolve above.

      expect(res.status).to.have.been.calledWith(404);
    });    
  })
    
})


  
  
  
  
  
  
  
