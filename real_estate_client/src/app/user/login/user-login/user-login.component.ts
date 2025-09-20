import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserLoginDto } from '../../../model/user';
import { take } from 'rxjs';

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

  // Simulate Sign In with local storage
  signInLocalStorage(){
    const user = {
      userName: this.username.value,
      password: this.password.value
  };

    const userStorage = this.authService.AuthenticateUserLocalStorage(user);
    if(userStorage) {
        localStorage.setItem('token', userStorage.userName);
        this.messageService.add({ severity: 'success', summary: 'Login Successful!', life: 4000});
        this.route.navigate(['']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Login Failed!', life: 4000});
    }
  }

  signIn(){
    const user = {
      username: this.username.value,
      password: this.password.value
    } as UserLoginDto;

    this.authService.AuthenticateUser(user)
        .pipe(take(1))
        .subscribe({
        next: (response: UserLoginDto) => {
          const user = response;
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          this.messageService.add({ severity: 'success', summary: 'Login Successful!', life: 2000});
          this.route.navigate(['']);  
       }, error: err => {
          console.log(err.error);
          this.messageService.add({ severity: 'error', summary: err.error, life: 2000});
       }
  })
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
