import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../components/ui/input/input.component';
import { ButtonsComponent } from '../../components/ui/buttons/buttons.component';
import { AuthLayoutComponent } from 'app/components/auth-layout/auth-layout.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterLink } from '@angular/router';
import { tokenStorage } from 'utils/storage';

@Component({
  selector: 'app-new-password',
  standalone: true,
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss',
  imports: [InputComponent, ButtonsComponent, AuthLayoutComponent, RouterLink],
})
export class NewPasswordComponent implements OnInit {
  newPassword: string = '';
  repeatedPassword: string = '';
  token: string = '';
  matchedPassword: boolean = false;

  errorMessage: string = '';
  isLoading: boolean = false;
  changedPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (tokenStorage()) {
      this.router.navigate(['/home']);
    }
  }

  onUpdatePassword(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.errorMessage = '';
    this.newPassword = newValue;
  }

  onRepeatPassword(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.repeatedPassword = newValue;
    if (
      this.newPassword === this.repeatedPassword &&
      this.repeatedPassword.length >= 5
    ) {
      this.errorMessage = '';
      this.matchedPassword = true;
    } else if (this.repeatedPassword.length >= 5) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.matchedPassword = false;
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.token = this.router.url.split('token=')[1];

    this.authService
      .postNewPassword({
        password: this.newPassword,
        token: this.token,
      })
      .subscribe((response: any) => {
        if (response.code === 'ok') {
          this.changedPassword = true;
          this.isLoading = false;
        } else {
          this.errorMessage = 'Hubo un error';
          this.isLoading = false;
        }
      });
  }
}
