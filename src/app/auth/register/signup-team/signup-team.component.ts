import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SignUpService } from '../signup.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../../components/auth-layout/auth-layout.component';
import { InputComponent } from '../../../components/ui/input/input.component';
import { AutocompleteComponent } from '../../../components/ui/autocomplete/autocomplete.component';
import { ButtonsComponent } from '../../../components/ui/buttons/buttons.component';
import { TeamCardComponent } from '../../../components/ui/team-card/team-card.component';

@Component({
  selector: 'app-signup-team',
  standalone: true,
  templateUrl: './signup-team.component.html',
  styleUrl: './signup-team.component.scss',
  imports: [
    ReactiveFormsModule,
    AuthLayoutComponent,
    InputComponent,
    AutocompleteComponent,
    ButtonsComponent,
    TeamCardComponent,
  ],
})
export class SignUpTeamComponent {
  @Input() center: any;
  teamForm: FormGroup = new FormGroup({});

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();
  @Output() teamEvent: EventEmitter<any> = new EventEmitter();

  constructor(private signUpService: SignUpService, private fb: FormBuilder) {}

  createNewTeam() {
    this.teamEvent.emit();
  }

  onSubmit(team: any) {
    const formData = {
      step: 2,
      data: {
        team,
      },
    };
    this.formEvent.emit(formData);
  }
}
