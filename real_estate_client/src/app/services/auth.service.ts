import { Injectable } from '@angular/core';
import { User, UserLoginDto } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Simulate sign-in functionality with Local Storage users
  AuthenticateUserLocalStorage(user: any) : User{
    let users = [];
    if(localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
    }
    return users.find(u => u.userName == user.userName && u.password == user.password);
  }

  AuthenticateUser(user: UserLoginDto){
    return this.http.post(this.baseUrl +'/account/sign-in', user);
  }

  SaveUser(user: User){
    return this.http.post(this.baseUrl +'/account/sign-up', user);
  }
}
