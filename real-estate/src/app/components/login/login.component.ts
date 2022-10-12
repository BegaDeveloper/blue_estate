import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserData, UserLoggedIn } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LANG } from 'src/app/shared/markup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  newUser: UserData = new UserData('', '', '', '');
  loggedUser: UserLoggedIn = new UserLoggedIn('', '');
  loginMode: boolean = true;
  emailValid: boolean;
  emailMessage: string;

  constructor(
    private location: Location,
    private authService: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  back() {
    this.location.back();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  generateForm(): FormGroup {
    return (this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    }));
  }
  onSubmit() {
    if (this.loginMode) {
      this.onLogin();
    } else {
      this.onRegister();
    }
  }

  onRegister() {
    this.newUser = this.loginForm.value;
    if (this.emailValid) {
      this.authService.registerUser(this.newUser).subscribe({
        next: (res) => {
          this.openSnackBar(LANG.successRegister);
        },
        error: (error: any) => {
          this.openSnackBar('Error');
        },
      });
    }
  }

  onLogin() {
    const user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(user).subscribe((res: any) => {
      if (!res.success) {
        this.openSnackBar(LANG.errorMess);
      } else {
        this.openSnackBar(LANG.successLogin);
        this.router.navigate(['/main/list']);
      }
    });
  }

  checkUserValid() {
    if (!this.loginMode) {
      const mail = this.loginForm.get('email')!.value;
      this.authService.checkUser(mail).subscribe((res: any) => {
        if (!res.success) {
          this.emailValid = false;
          this.openSnackBar(res.message);
        } else {
          this.emailValid = true;
          this.emailMessage = res.message;
          this.authService.storeUserData(res.token, res.user);
        }
      });
    }
  }
}
