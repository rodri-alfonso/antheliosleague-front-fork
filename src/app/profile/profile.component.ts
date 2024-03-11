import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { Router } from '@angular/router';
import { RoundCardComponent } from 'app/components/round-card/round-card.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { ProfileEditorComponent } from 'app/components/profile-editor/profile-editor.component';
import { AuthService } from 'app/auth/auth.service';
import { SpinnerComponent } from 'app/components/ui/spinner/spinner.component';
import { PaginatorModule } from 'primeng/paginator';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    AppLayoutComponent,
    RoundCardComponent,
    ButtonsComponent,
    ProfileEditorComponent,
    PaginatorModule,
    SpinnerComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  openProfileEditor: boolean = false;
  team: any = null;
  user: any = null;
  loading: boolean = true;
  paginationStep: number = 0;

  redirectUrl: string = environment.production
    ? 'https://antheliosleague.com'
    : 'https://pre.antheliosleague.com';

  usersToPaginator: any[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(({ user }: any) => {
      this.user = user;

      this.authService.getTeamInfoById(user.team.id).subscribe((team) => {
        this.team = team;
        this.loading = false;

        for (var i = 0; i < this.team.users.length; i += 6) {
          this.usersToPaginator.push(this.team.users.slice(i, i + 6));
        }
      });
    });
  }

  handleClickBack() {
    if (this.openProfileEditor) {
      this.toggleProfileEditor();
      return;
    }

    this.router.navigate(['/home']);
  }

  handleClickNextStep() {
    if (this.paginationStep !== this.usersToPaginator.length - 1) {
      this.paginationStep++;
      return;
    }
  }

  handleClickBackStep() {
    if (this.paginationStep !== 0) {
      this.paginationStep--;
      return;
    }
  }

  toggleProfileEditor() {
    this.openProfileEditor = !this.openProfileEditor;
  }

  share() {
    if (typeof navigator.share !== 'undefined') {
      navigator.share({
        title: 'Anthelios League',
        text: `¡Únete a mi equipo "${this.team.name}" del centro "${this.user.center.name}" en la competición de casos clínicos Anthelios League!`,
        url: this.redirectUrl,
      });
    }
  }
}
