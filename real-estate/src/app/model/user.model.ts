export interface UserDTO {
  user: string;
  email: string;
  mobile: string;
  password: string;
}

export class UserData implements UserDTO {
  constructor(
    public user: string,
    public email: string,
    public mobile: string,
    public password: string
  ) {}
}

export interface UserLogin {
  email: string;
  password: string;
}

export class UserLoggedIn implements UserLogin {
  constructor(public email: any, public password: any) {}
}
