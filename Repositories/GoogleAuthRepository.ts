import { AuthorizationCode } from 'simple-oauth2';
import { IGoogleAuthRepository } from '../InterfacesRepositories/IGoogleAuthRepository';
import fetch from "node-fetch";


const SCOPES = ['profile', 'email'];

export default class GoogleAuthRepository implements IGoogleAuthRepository {
  oAuth2Client
  REDIRECT_URI = process.env.NODE_ENV !== 'production'? 'http://localhost:3000/api/v1/user/google/callback': 'https://texteditor-production-eaf9.up.railway.app/api/v1/user/google/callback'

  constructor() {
    
    this.oAuth2Client = new AuthorizationCode({
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: {
        tokenHost: 'https://accounts.google.com',
        authorizePath: '/o/oauth2/v2/auth',
        tokenPath: '/o/oauth2/token',
      },
    });
    
  }

  async getAuthUrl(): Promise<string> {
    const authorizationUri = this.oAuth2Client.authorizeURL({
      redirect_uri: this.REDIRECT_URI,
      scope: SCOPES.join(' '),
    });
    console.log(authorizationUri)
    return authorizationUri;
  }

  async getAccessToken(code: string): Promise<any> {
    const tokenConfig = {
      code: code,
      redirect_uri: this.REDIRECT_URI,
    };

    const accessToken = await this.oAuth2Client.getToken(tokenConfig);

    return accessToken;
  }

  async getUserProfile(tokens: any): Promise<any> {
    const userInfoEndpoint = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.token.access_token}`;

    try {
      let response = await fetch(userInfoEndpoint, {
        method: 'POST',
      });
      response = await response.json();

      if (!response) {
        return response;
      } else {
        throw new Error('Failed to retrieve user profile');
      }
    } catch (error) {
      throw new Error('Failed to retrieve user profile');
    }
  }
}