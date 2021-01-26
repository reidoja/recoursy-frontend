export interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  user: FullUserData;
  token: string;
}

export interface FullUserData {
  id: 1;
  name: string;
  email: string;
  role: string;
  hasNotif: boolean;
}
