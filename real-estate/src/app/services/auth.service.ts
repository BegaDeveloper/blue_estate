import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  domain: string = 'http://localhost:3000';
  authToken: any;
  user: any;
  options: any;

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post(this.domain + '/user/register', user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  checkUser(mail: any) {
    return this.http.get(this.domain + '/user/checkEmail/' + mail).pipe(
      map((res) => {
        return res;
      })
    );
  }

  login(user: any) {
    return this.http.post(this.domain + '/user/login', user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  createAuthHeader() {
    this.loadToken();
    this.options = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('authorization', this.authToken);
  }

  getProfile() {
    this.createAuthHeader();

    return this.http.get(this.domain + '/user/profile', this.options).pipe(
      map((res) => {
        return res;
      })
    );
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
