import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

const baseUrl = '/api/';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.initialize();
  }
  private initialize() {
    const userData = localStorage.getItem('id_token');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.setLoggedIn(true, this.token);
    }
  }
  private setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn.next(loggedIn);
    this.token = token;
  }
  get isLoggedIn() {
    let result = 'krknwl';
    this.loggedIn.asObservable().subscribe((e) => (result = e.toString()));
    return result;
  }
  public getrequest(route: string, data?: any) {
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach((key) => {
        params = params.set(key, data[key]);
      });
    }
    return this.http.get(baseUrl + route, {
      responseType: 'json',
      params,
    });
  }
  public request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.getrequest(route);
    }
    if (this.token) {
      const header = { Authorization: `${this.token}` };
      const payload = {
        responseType: 'json',
        observe: 'body',
      };
      Object.assign(payload, header);
      Object.assign(payload, data);
      if (method === 'POST') return this.http.post(baseUrl + route, payload);
      else if (method === 'PUT') return this.http.put(baseUrl + route, payload);
    }
  }
  private setSession(authResult) {
    this.token = authResult.token;
    this.setLoggedIn(true, this.token);
    localStorage.setItem('id_token', authResult);
    this.router.navigate(['/home']);
  }
  public login(user) {
    let error_message;
    let payload;
    if (user.email !== '' && user.password !== '') {
      payload = this.http.post(baseUrl + 'auth', user).subscribe(
        (response: any) => {
          if (response.token) {
            this.setSession(response);
          } else {
            if (response.error) error_message = response.error;
            else error_message = 'Invalid Credentials';
          }
        },
        (error) => {
          error_message = error.error;
        }
      );
    } else {
      error_message = 'Invalid Credentials';
    }
    if (error_message) return { error: error_message };
    else return { message: payload.message };
  }
  public logout() {
    if (this.isLoggedIn) {
      this.setLoggedIn(false);
      delete this.token;
      localStorage.removeItem('id_token');
      this.router.navigate(['/login']);
    }
  }
  public register(user) {
    if (user.email !== '' && user.password !== '' && user.name !== '') {
      return this.http
        .post(baseUrl + 'users', user)
        .subscribe((response: any) => {
          if (response.token !== undefined) {
            this.token = response.token;
            this.setLoggedIn(true, this.token);
            const userData = {
              token: this.token,
            };
            localStorage.setItem('user', JSON.stringify(userData));
          }
        });
    }
  }
}
