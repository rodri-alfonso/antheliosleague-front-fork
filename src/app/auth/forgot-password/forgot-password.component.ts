import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ButtonsComponent } from '../../components/ui/buttons/buttons.component';
import { InputComponent } from '../../components/ui/input/input.component';
import { AuthLayoutComponent } from 'app/components/auth-layout/auth-layout.component';
import { AuthService } from '../auth.service';
import { tokenStorage } from 'utils/storage';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [RouterLink, ButtonsComponent, InputComponent, AuthLayoutComponent],
})
export class ForgotPasswordComponent implements OnInit {
  public currentValue: string = '';

  email: string = '';
  isValidEmail: boolean = false;

  errorMessage: string = '';
  sendedEmail: boolean = false;

  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (tokenStorage()) {
      this.router.navigate(['/home']);
    }
  }

  onChangeEmail(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.errorMessage = '';

    const isValidEmail =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(newValue);

    this.isValidEmail = isValidEmail;
    this.email = newValue;
  }

  onSubmit() {
    this.isLoading = true;

    this.authService
      .changePassword({
        email: this.email,
      })
      .subscribe((response: any) => {
        if (response.code === 'ok') {
          this.sendedEmail = true;
        } else {
          this.errorMessage = 'Usuario no encontrado e-mail incorrecto';
          this.isLoading = false;
        }
      });
  }
}
