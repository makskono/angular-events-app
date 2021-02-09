import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: any): any {
    return this.http.post(this.registerUrl, user);
  }

  loginUser(user: any): any {
    return this.http.post(this.loginUrl, user);
  }

  loggedIn(): any {
    return !!localStorage.getItem('token');
  }

  logoutUser(): any {
    localStorage.removeItem('token');
    this.router.navigate(['/events']);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
