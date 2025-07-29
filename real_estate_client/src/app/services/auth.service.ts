import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticateUser(user: any) : User{
    let users = [];
    if(localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
    }

    return users.find(u => u.userName == user.userName && u.password == user.password);
  }
}
