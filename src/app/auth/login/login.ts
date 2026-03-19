import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { ButtonDirective } from 'primeng/button';
import { Toast } from '../../services/toast';
import { AuthService } from '../../services/auth.service';
import { login } from '../../Types/Login';
import {LoginResponse} from '../../Types/LoginResponse';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    RouterLink,
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private toast: Toast,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = this.fb.group({
      Username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(12)]],
    });
  }

  get Username() {
    return this.form.get('Username');
  }

  get password() {
    return this.form.get('password');
  }

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formData = this.form.value;

    this.api.store<login, LoginResponse>('account/login', this.form.value)
      .subscribe({
        next: (response:LoginResponse) => {
          this.toast.success('Login successful');

          // Store user data if returned
          this.authService.setAuthToken(response.token);

          this.authService.setUserData({
            username: response.username,
            email: response.email
          });

          // Handle login success - redirect based on new user status
          this.authService.handleLoginSuccess();

          console.log('Login response:', response);
        },
        error: (err) => {
          if (err.error?.length) {
            this.toast.error(err.error[0].description);
          } else {
            this.toast.error('Invalid email or password');
          }
        }
      });
  }
}
