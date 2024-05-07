export interface User {
  username: string;
  email: string;
  authentication: AuthRecord[];
}

export interface AuthRecord {
  id: string;
  authType: string; 
  salt: string;
  password: string;
  sessionToken: string;
}
