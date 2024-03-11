import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../components/ui/input/input.component';
import { AutocompleteComponent } from '../../components/ui/autocomplete/autocomplete.component';
import { ButtonsComponent } from '../../components/ui/buttons/buttons.component';

import { SignUpComponent } from './signup/signup.component';
import { SignUpTeamCreatorComponent } from './signup-team-creator/signup-team-creator.component';
import { SignUpTeamComponent } from './signup-team/signup-team.component';
import { SignUpSuccessComponent } from './signup-success/signup-success.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SignUpService } from './signup.service';
import { Center } from 'types';
import { tokenStorage } from 'utils/storage';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',

  imports: [
    RouterLink,
    ButtonsComponent,
    InputComponent,
    AutocompleteComponent,
    SignUpComponent,
    SignUpTeamCreatorComponent,
    SignUpTeamComponent,
    SignUpSuccessComponent,
    InputSwitchModule,
  ],
})
export class RegisterComponent {
  currentStep: number = 1;
  formData: any = {};
  centers: Center[] = [];
  currentCenter: any = {};

  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit(): void {
    if (tokenStorage()) {
      this.router.navigate(['/home']);
    }

    this.signUpService.getCenters().then((response) => {
      this.centers = response;
    });
  }

  continue() {
    this.currentStep = this.currentStep + 1;
  }

  handleTeamRegisterStep() {
    this.currentStep = 0;
  }

  signUp() {
    this.signUpService.postSignup(this.formData).subscribe((response) => {
      if (response.code === 'ok') {
      } else this.router.navigate(['/signup']);
    });
  }

  handleFormEvent(event: { step: number; data: any }) {
    this.formData = { ...this.formData, ...event.data };

    if (event.step === 1) {
      const centerTouched = this.centers.find(
        (center) => center.id === this.formData.center.id
      );
      if (!centerTouched) {
        this.currentCenter = { name: this.formData.center.name, id: null };
      } else {
        this.currentCenter = centerTouched;
      }
    }

    if (event.step === 0) {
      this.currentStep = 3;
      this.signUp();
      return;
    }

    if (event.step === 2 && !Boolean(this.formData?.center?.id)) {
      this.currentStep = 0;
      return;
    }

    if (event.step === 2) {
      this.signUp();
    }

    this.continue();
  }
}
