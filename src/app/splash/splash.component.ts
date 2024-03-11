import { Component, OnInit } from '@angular/core';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { Router } from '@angular/router';
import { tokenStorage } from 'utils/storage';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [AuthLayoutComponent],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent implements OnInit {
  public isSplash: boolean;
  constructor(private router: Router) {
    this.isSplash = this.router.url === '/splash';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate([tokenStorage() ? '/home' : '/login']);
    }, 3000);
  }
}
