import { AuthorizationCode } from 'simple-oauth2';
import { IGoogleAuthRepository } from '../InterfacesRepositories/IGoogleAuthRepository';

const REDIRECT_URI = 'http://localhost:3000/api/v1/user/google/callback';

const SCOPES = ['profile', 'email'];

export default class GoogleAuthRepository implements IGoogleAuthRepository {
  oAuth2Client: any;

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
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(' '),
      access_type: 'offline',
    });
    return authorizationUri;
  }

  async getAccessToken(code: string): Promise<any> {
    const tokenConfig = {
      code: code,
      redirect_uri: REDIRECT_URI,
    };

    const accessToken = await this.oAuth2Client.getToken(tokenConfig);
    return accessToken;
  }

  async getUserProfile(tokens: any): Promise<any> {
    const userInfo = await this.oAuth2Client.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    return userInfo.data;
  }
}