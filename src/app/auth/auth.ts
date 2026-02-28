import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    RouterOutlet,

  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  activeStep: number = 1;

  constructor(private router: Router) {}


}
