
export interface IGoogleAuthRepository {
  getAuthUrl(): Promise<string>;
  getAccessToken(code: string): Promise<any>;
  getUserProfile(tokens: any): Promise<any>;
}