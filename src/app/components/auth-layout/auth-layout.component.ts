import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isMobile } from 'utils';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  public isSplash: boolean;
  public isMobile: boolean = isMobile();

  constructor(private readonly router: Router) {
    this.isSplash = this.router.url === '/';
  }
}
