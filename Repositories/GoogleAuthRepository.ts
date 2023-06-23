

import { IGoogleAuthRepository } from '../InterfacesRepositories/IGoogleAuthRepository';
const REDIRECT_URI = 'http://localhost:3000/api/v1/user/google/callback';
const google = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile',
'https://www.googleapis.com/auth/userinfo.email'];

export default class GoogleAuthRepository implements IGoogleAuthRepository {
  oAuth2Client: any
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: REDIRECT_URI,
    });
  }
    
  async getAuthUrl(): Promise<string> {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'online',
        scope: SCOPES,
      });
      return authUrl;
  }
  
  async getAccessToken(code: string): Promise<any> {
      const { tokens } = await this.oAuth2Client.getToken(code);
      return tokens;
  }
  
  async getUserProfile(tokens: any): Promise<any> {
      this.oAuth2Client.setCredentials(tokens);
      const userInfo = await google.oauth2('v2').userinfo.get({
        auth: this.oAuth2Client,
      });
      
      return userInfo.data;
  }

}