import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface LoginResponse {
  user_info: {
    id: number;
    username: string;
    email: string;
  };
  token: string;
}

interface RegisterResponse {
  user_info: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const url = this.baseUrl + 'login/';
    const data = { username, password };

    return this.http.post<LoginResponse>(url, data).pipe(
      map((response) => {
        console.log(response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user_info));
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.log('Login error:', error);
        return of(false);
      })
    );
  }

  register(
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string
  ) {
    const url = this.baseUrl + 'register/';
    const data = { username, password, email, first_name, last_name };

    console.log(data);

    return this.http.post<RegisterResponse>(url, data).pipe(
      map((response) => {
        console.log(response);
        if (response && response.token) {
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const userString = localStorage.getItem('user');
    if (userString === null) {
      return null;
    }
    return JSON.parse(userString);
  }

  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.post('http://127.0.0.1:8000/api/logout/', {}, { headers });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}
