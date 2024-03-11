import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignUpService } from '../signup.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthLayoutComponent } from 'app/components/auth-layout/auth-layout.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { InputComponent } from 'app/components/ui/input/input.component';
import { AvatarSelectComponent } from 'app/components/ui/avatar-select/avatar-select.component';

@Component({
  selector: 'app-signup-team-creator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthLayoutComponent,
    ButtonsComponent,
    InputComponent,
    AvatarSelectComponent,
  ],
  templateUrl: './signup-team-creator.component.html',
  styleUrl: './signup-team-creator.component.scss',
})
export class SignUpTeamCreatorComponent implements OnInit {
  teamForm: FormGroup = new FormGroup({});
  selectedLogoId: number = 0;
  teamErrorMessage: string = '';

  @Input() centerName: string = '';
  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor(private signUpService: SignUpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.signUpService.validateFormData({ data: '' }).subscribe((response) => {
      if (response.code === 'ok') {
        const formData = {
          step: 0,
          data: {
            team: {
              name: this.teamForm.get('teamName')?.value,
              avatar: this.selectedLogoId,
            },
          },
        };
        this.formEvent.emit(formData);
      }
    });
  }

  continueInvalid() {
    this.signUpService
      .validateTeamName({
        teamName: this.teamForm.get('teamName')?.value,
        centerId: 0,
      })
      .then((response) => {
        response.subscribe((response) => {
          if (!response.exist) {
            const formData = {
              step: 0,
              data: {
                team: {
                  name: this.teamForm.get('teamName')?.value,
                  avatar: this.selectedLogoId,
                },
              },
            };
            this.formEvent.emit(formData);
          } else {
            this.teamErrorMessage = 'El nombre del equipo ya existe';
          }
        });
      });
  }

  handleFormEvent(event: any) {
    this.selectedLogoId = event?.code;
  }
}
