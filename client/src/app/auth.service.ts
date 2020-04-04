import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthService implements OnInit {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private server: ServerService) {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }
  ngOnInit() {
    this.logout();
  }
  login(user) {
    if (user.email !== '' && user.password !== '') {
      return this.server
        .request('POST', '/api/auth', {
          email: user.email,
          password: user.password,
        })
        .subscribe((response: any) => {
          if (response.token !== undefined) {
            this.token = response.token;
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigateByUrl('/home');
          }
        });
    }
  }

  logout() {
    if(this.isLoggedIn){
    this.server.setLoggedIn(false);
    delete this.token;
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
    }
  }
  register(user) {
    if (user.email !== '' && user.password !== '' && user.name !== '') {
      return this.server
        .request('POST', '/api/users', user)
        .subscribe((response: any) => {
          if (response.token !== undefined) {
            this.token = response.token;
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            this.router.navigateByUrl('/home');
          }
        });
    }
  }
}
