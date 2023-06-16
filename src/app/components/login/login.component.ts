import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _router: Router, private _auth: AuthService) {}

  public userDetails: any = {
    userName: '',
    password: ''
  };

  public errMsg: string = '';

  login() {
    try {
      if (this.userDetails.userName.trim().length === 0) {
        this.errMsg = "UserName is required";
      } else if (this.userDetails.password.trim().length === 0) {
        this.errMsg = "Password is required";
      } else {
        this.errMsg = "";
        let res = this._auth.login(this.userDetails.userName, this.userDetails.password);
        if (res === 200) {
          this._router.navigate(['home']);
        }
        if (res === 403) {
          this.errMsg = "Invalid Credentials";
        }
      }
    } catch (error) {
      console.error('Failed to Loged in');
    }
  }

}
