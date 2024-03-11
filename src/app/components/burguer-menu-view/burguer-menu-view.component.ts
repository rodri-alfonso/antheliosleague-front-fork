import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-burguer-menu',
  standalone: true,
  imports: [RouterLink, ProgressSpinnerModule],
  templateUrl: './burguer-menu-view.component.html',
  styleUrl: './burguer-menu-view.component.scss',
})
export class BurguerMenuViewComponent {
  @Output() formEvent: EventEmitter<any> = new EventEmitter();
  loadingLogout: boolean = false;

  constructor(
    private readonly router: Router,
    private authService: AuthService
  ) {}

  handleSelectItem() {
    this.formEvent.emit();
  }

  handleLogout() {
    this.loadingLogout = true;
    this.authService.postLogout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
