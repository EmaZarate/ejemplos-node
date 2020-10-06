import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Credentials } from '../models/credentials';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: Credentials;
  loginForm: FormGroup;

  get username() { return this.loginForm.get('username').value; }
  get password() { return this.loginForm.get('password').value; }

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.modelCreate();
  }

  modelCreate() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
      this.loginService.loginAndinaUser(this.username, this.password, true)
      .subscribe(result => {
          if (result) {
              this.router.navigate(['/orders']);
          }
      });
  }
}
