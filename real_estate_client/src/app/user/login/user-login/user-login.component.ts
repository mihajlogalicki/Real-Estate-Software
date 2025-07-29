import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(){
    this.initLoginForm();
  }

  signIn(){
    const user = {
      userName: this.username.value,
      password: this.password.value
  };

    const userStorage = this.authService.authenticateUser(user);
    if(userStorage) {
        localStorage.setItem('token', userStorage.userName);
        this.messageService.add({ severity: 'success', summary: 'Login Successful!', life: 4000});
        this.route.navigate(['']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Login Failed!', life: 4000});
    }
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  // getters
  get username() {
    return this.loginForm.get('userName') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
