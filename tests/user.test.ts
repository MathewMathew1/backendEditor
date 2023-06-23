import { expect } from 'chai';
import chai from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { IAuthRepository } from '../InterfacesRepositories/IAuthRepository';
import { IGoogleAuthRepository } from '../InterfacesRepositories/IGoogleAuthRepository';
import UserController from '../Api/UserController';
import sinon from 'sinon';
import { IUser, UserDto } from '../Schemas/userModel';
import { createRandomUser } from './helper-tests';
import sinonChai from 'sinon-chai';
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { IGetUserAuthInfoRequest } from '../types/types';

chai.use(sinonChai)
dotenv.config()

describe("userController", () => {
    let userRepositoryStub=  <sinon.SinonStubbedInstance<IAuthRepository>>{}
    let googleRepositoryStub= <sinon.SinonStubbedInstance<IGoogleAuthRepository>>{}
    
    describe("LoginWithEmail", () => {
        const sandbox = sinon.createSandbox();
        userRepositoryStub.getUserByEmail = sandbox.stub()
        userRepositoryStub.createToken = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq();
        const res = mockRes({
            json: sinon.spy(),
            cookie: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        });

      it("Correct password return 201 and token", async () => {
        // Arrange
        const password = "123123123"
      
        req.body = {email: "email", password: password}

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT!))
        const userReturned: IUser = createRandomUser()
        userReturned.password = hashedPassword
        const token = 'access_token'
        
        userRepositoryStub.getUserByEmail.resolves(userReturned);
        userRepositoryStub.createToken.resolves(token);
        
        // Act
       
        let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
        
        await controller.apiEmailLoginIn(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.
        expect(res.status).to.have.been.calledWith(201);
        expect(res.cookie).to.have.been.calledWith('token', token);
      });
      it("Should return 400 with wrong password", async () => {
        // Arrange
        const password = "123123123"
      
        req.body = {email: "email", password: password}
        const hashedPassword = await bcrypt.hash("DiffrentPassword", parseInt(process.env.BCRYPT_SALT!))
        const userReturned: IUser = createRandomUser()
        userReturned.password = hashedPassword
        const token = 'access_token'
        
        userRepositoryStub.getUserByEmail.resolves(userReturned);
        userRepositoryStub.createToken.resolves(token);
        
        // Act
       
        let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
        
        await controller.apiEmailLoginIn(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.
        expect(res.status).to.have.been.calledWith(400);

      });
      it("Should return 404 with no user found", async () => {
        // Arrange
        const password = "123123123"
      
        req.body = {email: "email", password: password}

        const token = 'access_token'
        
        userRepositoryStub.getUserByEmail.resolves(null);
        userRepositoryStub.createToken.resolves(token);
        
        // Act
       
        let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
        
        await controller.apiEmailLoginIn(req,res)
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.
        expect(res.status).to.have.been.calledWith(400);

      });
    })
    describe("SignUpWithEmail", () => {
        const sandbox = sinon.createSandbox();
        userRepositoryStub.createEmailUser = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq();
        const res = mockRes({
            json: sinon.spy(),
            cookie: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        });
        it("Should return 201", async () => {
            // Arrange
            const password = "123123123"
            req.body = {email: "email", password: password}
            
            userRepositoryStub.createEmailUser.resolves(createRandomUser());
            
            // Act
           
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiEmailSignUp(req,res)
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(201);
    
          });
    })
    describe("LoginWithUsername", () => {
        const sandbox = sinon.createSandbox();
        userRepositoryStub.getUserByUsername = sandbox.stub()
        userRepositoryStub.createToken = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq();
        const res = mockRes({
            json: sinon.spy(),
            cookie: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        });
        it("Should return return 201 and token with Correct password", async () => {
            // Arrange
            const password = "123123123"
      
            req.body = {username: "username", password: password}

            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT!))
            const userReturned: IUser = createRandomUser()
            userReturned.password = hashedPassword
            const token = 'access_token'
            
            userRepositoryStub.getUserByUsername.resolves(userReturned);
            userRepositoryStub.createToken.resolves(token);
            
            // Act
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiUsernameLoginIn(req,res)
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(201);
            expect(res.cookie).to.have.been.calledWith('token', token);
    
          });
          it("Should return 400 with wrong password", async () => {
            // Arrange
            const password = "123123123"
          
            req.body = {username: "username", password: password}
            const hashedPassword = await bcrypt.hash("DifferentPassword", parseInt(process.env.BCRYPT_SALT!))
            const userReturned: IUser = createRandomUser()
            userReturned.password = hashedPassword
            const token = 'access_token'
            
            userRepositoryStub.getUserByUsername.resolves(userReturned);
            userRepositoryStub.createToken.resolves(token);
            
            // Act
           
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiUsernameLoginIn(req,res)
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(400);
    
          });
          it("Should return 404 with no user found", async () => {
            // Arrange
            const password = "123123123"
          
            req.body = {username: "username", password: password}
    
            const token = 'access_token'
            
            userRepositoryStub.getUserByUsername.resolves(null);
            userRepositoryStub.createToken.resolves(token);
            
            // Act
           
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiUsernameLoginIn(req,res)
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(400);
    
          });
    })
    describe("SignUpWithUsername", () => {
        const sandbox = sinon.createSandbox();
        userRepositoryStub.createUsernameUser = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq();
        const res = mockRes({
            status: sinon.stub().returns({ json: statusJsonSpy })
        });
        it("Should return 201", async () => {
            // Arrange
            const password = "123123123"
            req.body = {email: "email", password: password}
            
            userRepositoryStub.createUsernameUser.resolves(createRandomUser()); 
            // Act
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiUsernameSignUp(req,res)
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(201);
    
          });
    })
    describe("SignUpWithGoogle", () => {
        const sandbox = sinon.createSandbox();
        googleRepositoryStub.getAuthUrl = sandbox.stub()
        afterEach(function () {
            sinon.restore();
            sandbox.restore();
        });
        
        const statusJsonSpy = sinon.spy();
        const req = mockReq();
        const res = mockRes({
            json: sinon.stub().returns({JSON}),
            status: sinon.stub().returns({ json: statusJsonSpy }),
        });
        it("Should return 201 and correct link", async () => {
            // Arrange
            const googleLink = "link"
            googleRepositoryStub.getAuthUrl.resolves(googleLink); 
            // Act
            let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
            
            await controller.apiGoogleSignUp(req,res)
            
            // Assert
            // Is res.json called and passed the string from the Promise.resolve above.
            expect(res.status).to.have.been.calledWith(201);
            expect(statusJsonSpy.args[0][0].link).to.equal(googleLink);
          });
    })
    describe("GoogleCallback", () => {
      const sandbox = sinon.createSandbox();
      userRepositoryStub.createToken = sandbox.stub()
      googleRepositoryStub.getAccessToken = sandbox.stub()
      googleRepositoryStub.getUserProfile = sandbox.stub()
      userRepositoryStub.createGoogleUser = sandbox.stub()
      userRepositoryStub.getUserByGoogleId = sandbox.stub()
      afterEach(function () {
          sinon.restore();
          sandbox.restore();
      });
      
      const statusJsonSpy = sinon.spy();
      const req = mockReq();
      req.query.code = "2323"
      const res = mockRes({
          cookie: sinon.spy(),
          status: sinon.stub().returns({ json: statusJsonSpy }),
      });
      it("Should return cookie with token", async () => {
          // Arrange
          const token = 'access_token'
          const id = "11"
          const createdUser = createRandomUser()
          createdUser.google!.id = id
     
          userRepositoryStub.createToken.resolves(token); 
          googleRepositoryStub.getAccessToken.resolves("token")
          googleRepositoryStub.getUserProfile.resolves({email: "email", id: id})
          userRepositoryStub.getUserByGoogleId.resolves(createdUser)
          // Act
          let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
          
          await controller.apiGoogleCallback(req,res)
          
          // Assert
          // Is res.json called and passed the string from the Promise.resolve above.
          expect(res.cookie).to.have.been.calledWith('token', token)
        });
  })
  describe("apiGetUserProfileData", () => {
    const sandbox = sinon.createSandbox();

    afterEach(function () {
        sinon.restore();
        sandbox.restore();
    });
    
    const statusJsonSpy = sinon.spy();
    const req = mockReq() as IGetUserAuthInfoRequest;
    const res = mockRes({
        cookie: sinon.spy(),
        status: sinon.stub().returns({ json: statusJsonSpy }),
    });
    it("Should return dto object of user", async () => {
        // Arrange

        const createdUser = createRandomUser()
        req.user = createdUser
        const userDto = new UserDto(createdUser)

        // Act
        let controller: UserController = new UserController(userRepositoryStub, googleRepositoryStub)
        
        await controller.apiGetUserProfileData(req,res)
        
        // Assert
        // Is res.json called and passed the string from the Promise.resolve above.
        expect(statusJsonSpy.args[0][0].userData).to.deep.equal(userDto);
      });
})
    
})



  
  
  
  
  
  
  
