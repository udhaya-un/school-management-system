import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  public submitted = false;
  public loginText = '';
  public loginStatus = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService) {
    this.loginForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void { 
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService.userLogin().subscribe(data => {
        var uData = Object.keys(data).map(key => {
          return data[key];
        })
        this.loginStatus = uData.some(user => user.userName === this.loginForm.value.userName && user.password === this.loginForm.value.password)
        if (this.loginStatus) {
          this.loginText = 'You are successfully logged in'
          this.toastrService.success(this.loginText);
          this.loginService.setLoggedIn(this.loginStatus);
          this.router.navigate(["/dashboard"]);
        } else {
          this.loginText = 'The user name or password are incorrect'
          this.toastrService.warning(this.loginText);
          this.loginService.setLoggedIn(this.loginStatus);
        }
      });

    }
  }
}
