import {Component, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Api} from '../../services/api';
import {ButtonDirective} from 'primeng/button';
import {Toast} from '../../services/toast';
import {confirmPasswordValidator} from '../../utilities/ConfirmPassword';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    InputText,
    RouterLink,
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register  implements OnInit {
  form !: FormGroup;


  constructor(private router: Router,
              private api: Api,
              private fb: FormBuilder,
              private toast:Toast,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.FormRegister();
  }
  FormRegister(){
    this.form = this.fb.group({
      Username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
    });
  }
  get username() {
    return this.form.get('Username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  onRegister() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    this.api.store('account/register', this.form.value)
      .subscribe({
        next: (response: any) => {
          this.toast.success('Account created successfully');
          
          // Store auth token if returned from API
          if (response?.token) {
            this.authService.setAuthToken(response.token);
          }
          
          // Store user data if returned
          if (response?.user) {
            this.authService.setUserData(response.user);
          }
          
          // Handle registration success - redirect to welcome page
          this.authService.handleRegistrationSuccess();
        },
        error: (err) => {
          if (err.error?.length) {
            this.toast.error(err.error[0].description);
          } else {
            this.toast.error('Something went wrong');
          }
        }
      });
  }

}
