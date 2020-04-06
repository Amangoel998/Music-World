import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  constructor(private server: ServerService, private router: Router) {}
  ngOnInit(): void {
    this.initialize();
  }
  initialize() {
    if(this.server.isLoggedIn=='true')
      this.router.navigate(['/home'])
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  err: string;
  submit() {
    let result;
    if (this.form.valid) result = this.server.login(this.form.value);
    else this.err = 'Form is Invalid';
    if(result.error)
      this.err = result.error;
  }
  gotoRegister() {
    this.router.navigate(['/register']);
  }
}

@Component({
  selector: 'app-register-form',
  templateUrl: './registerform.component.html',
  styleUrls: ['./form.component.css'],
})
export class RegisterFormComponent {
  form: FormGroup;
  @Input() err: string;
  constructor(private server: ServerService, private router: Router) {
    this.initialize()
  }
  ngOnInit(): void {
    this.initialize()
  }
  initialize() {
    this.form = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      password: new FormControl(''),
    });
  }
  submit() {
    if (this.form.valid) this.server.register(this.form.value);
    else this.err = 'Form is Invalid';
  }
  gotoLogin() {
    this.router.navigate(['/login']);
  }
}