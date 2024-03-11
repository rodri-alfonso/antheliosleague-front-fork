import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { SplashComponent } from './splash/splash.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { RoundComponent } from './round/round.component';
import { RoundsComponent } from './rounds/rounds.component';
import { RankingsComponent } from './rankings/rankings.component';
import { AwardsComponent } from './awards/awards.component';
import { ProfileComponent } from './profile/profile.component';
import { CentersComponent } from './centers/centers.component';
import { InstructionsComponent } from './instructions/instructions.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'awards', component: AwardsComponent, canActivate: [authGuard] },
  { path: 'centers', component: CentersComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'rankings', component: RankingsComponent, canActivate: [authGuard] },
  { path: 'round', component: RoundComponent, canActivate: [authGuard] },
  { path: 'rounds', component: RoundsComponent, canActivate: [authGuard] },
  {
    path: 'instructions',
    component: InstructionsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
  },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '**', component: NotFoundComponent },
];
