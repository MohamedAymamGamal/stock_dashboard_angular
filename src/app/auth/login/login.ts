import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { ButtonDirective } from 'primeng/button';
import { Toast } from '../../services/toast';

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
})
export class Login implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private api: Api,
    private fb: FormBuilder,
    private toast: Toast
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

    this.api.store('account/login', this.form.value)
      .subscribe({
        next: (response) => {
          this.toast.success('Login successful');
          this.router.navigate(['/welcome']);
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
