import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service';
import { User } from '../../../model/user';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-register',
  standalone: false,
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  public registrationForm : FormGroup;
  public isRegisterFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private messageService: MessageService){}

  ngOnInit() {
    this.initRegistrationForm();
  }

  initRegistrationForm(){
    this.registrationForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    }, {validators: this.passwordMatchingValidator})
  }

  passwordMatchingValidator(formGroup: FormGroup) : Validators {
    return formGroup.get('password').value == formGroup.get('confirmPassword').value ? null : { notmatched: true };
  }

  registerUser(){
    this.isRegisterFormSubmitted = true;
    if(this.registrationForm.valid) {

        const userDto : User = {
          userName: this.username.value,
          password: this.password.value,
          email: this.email.value,
          mobile: this.mobile.value
        };

        this.authService.SaveUser(userDto)
            .pipe(take(1))
            .subscribe({
              next: (response: User) => {
                  this.messageService.add({ severity: 'success', summary: 'Registration Successful!', life: 3000});
                  this.registrationForm.reset();
                  this.isRegisterFormSubmitted = false;
              }, 
              error: err => {
                  this.messageService.add({severity: 'error', summary: err.error, life: 3000});
              }
        });
    } 
    else {
      this.messageService.add({severity: 'error', summary: 'Invalid register form!', life: 3000});
    }
  }

  // getters for form controls
  get username() {
    return this.registrationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }


 /* ~ Old and not efficient form initialization using Form Group instance
  oldFormInit(){
    this.registrationForm = new FormGroup({
        userName: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    }, this.passwordMatchingValidator);
  }
  */
}
