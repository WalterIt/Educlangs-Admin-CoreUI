import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  // selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  error: any;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      name: [this.user.name, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email ])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSubmit(): void {

    this.authService.onRegister(this.registerForm.value).subscribe(

      (response) => {
        this.router.navigate(['login']);
      },
      (response) => {
        if (response.status === 422) {
          Object.keys(response.error).map((err) => {
            this.error = `${response.error[err]}`;
          });

        } else {
          this.error = response.error;
        }

      }
    );
  }
}
