import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin: boolean = false;
  userData: any;
  constructor(private httpService: HttpClient) { }

  userLogin(): Observable<any> {
    return this.httpService.get('../../assets/user.json')
  }

  setLoggedIn(loginStatus) {
    this.isLogin = loginStatus;
  }
  getLoggedIn(){
    return this.isLogin;
  }


}
