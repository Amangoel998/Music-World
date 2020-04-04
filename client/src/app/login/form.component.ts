import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './loginform.component.html',
  styleUrls: ['./form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {}
  @Input() err;
  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value);
    }
  }
  @Input() error: string | null;
  gotoRegister() {
    this.router.navigate(['/register'])
  }
}

@Component({
  selector: 'app-register-form',
  templateUrl: './registerform.component.html',
  styleUrls: ['./form.component.css'],
})
export class RegisterFormComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {}
  @Input() err;
  submit() {
    if (this.form.valid) {
      this.auth.register(this.form.value);
    }
  }
  gotoLogin() {
    this.router.navigate(['/login'])
  }
  @Input() error: string | null;
}
