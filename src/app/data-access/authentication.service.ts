import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { environment } from '../environments/environment';
import { Requestor } from './requestor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private requestor = new Requestor<string>();
  constructor(private http: HttpClient, private router: Router) {}

  CheckUserAccess() {
    this.requestor.load(this.checkUserIsLogged()).then((p) => {
      if (this.requestor.hasError || this.requestor.data != 'ok') {
        this.router.navigate(['login']);
      }
    });
  }

  checkUserIsLogged() {
    return this.http.get<string>(
      environment.apiUrl + '/Authentication/CheckLoggedIn',
      {
        withCredentials: true,
      }
    );
  }

  login(loginModel: Login) {
    return this.http.post<string>(
      environment.apiUrl + '/Authentication/Login',
      loginModel,
      {
        withCredentials: true,
      }
    );
  }

  logout() {
    return this.http.get<string>(
      environment.apiUrl + '/Authentication/Logout',
      {
        withCredentials: true,
      }
    );
  }
}
