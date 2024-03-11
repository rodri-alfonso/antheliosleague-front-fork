import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ButtonsComponent } from '../../components/ui/buttons/buttons.component';
import { InputComponent } from '../../components/ui/input/input.component';
import { AuthLayoutComponent } from 'app/components/auth-layout/auth-layout.component';
import { AuthService } from '../auth.service';
import { tokenStorage } from 'utils/storage';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [RouterLink, ButtonsComponent, InputComponent, AuthLayoutComponent],
})
export class LoginComponent implements OnInit {
  public currentValue: string = '';

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (tokenStorage()) {
      this.router.navigate(['/home']);
    }
  }

  onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.email = newValue;
  }

  onChangePassword(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.password = newValue;
  }

  onSubmit() {
    this.isLoading = true;

    this.authService
      .postLogin({
        email: this.email,
        password: this.password,
      })
      .subscribe((response) => {
        if (response.code === 'ok') {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'El email o la contraseña son incorrectos';
        }
        this.isLoading = false;
      });
  }
}
