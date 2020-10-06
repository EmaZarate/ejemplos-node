import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.baseUrl + 'customer/login';
  private loggedIn = false;

  constructor(private httpService: HttpClient) {
    this.loggedIn = !!localStorage.getItem('auth_tokenn');
  }

  loginAndinaUser(username, password, isBackend) {
    return this.httpService.post(this.loginUrl, JSON.stringify({username, password, isBackend}), httpOptions)
    .pipe(map((res: any) => {
      const auth_token = res.data.auth_token;
      localStorage.setItem('auth_tokenn', auth_token);
      this.loggedIn = true;
      return res;
    }));
  }

  getAccesToken() {
    const token = localStorage.getItem('auth_tokenn');

    if (!token) {
      return 'this is a test';
    } else {
      return token;
    }
  }

  logout() {
    localStorage.removeItem('auth_tokenn');
    this.loggedIn = false;
  }
}
