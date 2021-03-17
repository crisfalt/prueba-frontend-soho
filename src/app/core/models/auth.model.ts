export class AuthModel {

}

export class LoginModel {
  email: string;
  password: string;
}

export class LoginResultModel {
  access_token: string;
  token_type: string;
  expires_in: number;
}
