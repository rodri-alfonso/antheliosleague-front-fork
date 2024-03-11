import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignUpService } from '../signup.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutocompleteComponent } from '../../../components/ui/autocomplete/autocomplete.component';
import { ButtonsComponent } from '../../../components/ui/buttons/buttons.component';
import { AuthLayoutComponent } from '../../../components/auth-layout/auth-layout.component';
import { InputComponent } from 'app/components/ui/input/input.component';
import { SwitchComponent } from 'app/components/ui/switch/switch.component';
import { SelectComponent } from 'app/components/ui/select/select.component';
import { AvatarSelectComponent } from 'app/components/ui/avatar-select/avatar-select.component';
import { Center } from 'types';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [
    ReactiveFormsModule,
    AutocompleteComponent,
    ButtonsComponent,
    AuthLayoutComponent,
    InputComponent,
    SwitchComponent,
    SelectComponent,
    AvatarSelectComponent,
    RouterLink,
    DialogModule,
  ],
})
export class SignUpComponent implements OnInit {
  baseForm: FormGroup = new FormGroup({});
  selectedCenter: any = {};
  selectedPosition: any = {};
  selectedAvatar: any = {};
  isLoading: boolean = false;
  isOpenModal: boolean = false;

  emailValidatorMessage: string = '';
  nicknameValidatorMessage: string = '';

  centers: Center[] = [];
  positions = [
    { name: 'Residente', code: 'RE' },
    { name: 'Adjunto', code: 'AD' },
    { name: 'Jefe de Servicio', code: 'JDS' },
  ];

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor(private signUpService: SignUpService, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    this.baseForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^.{5,}$'),
        ],
      ],
      avatar: [false, [Validators.required]],
      position: ['', [Validators.required]],
      sendNews: [false],
      confirmConditions: [
        false,
        [Validators.required, Validators.requiredTrue],
      ],
    });
    this.centers = await this.signUpService.getCenters();
  }

  openModal() {
    this.isOpenModal = true;
  }
  closeModal() {
    this.isOpenModal = false;
  }

  onSubmit() {
    this.signUpService
      .validateFormData({
        data: {
          step: 1,
          data: {
            fullname: this.baseForm.get('fullname')?.value,
            nickname: this.baseForm.get('nickname')?.value,
            email: this.baseForm.get('email')?.value,
            password: this.baseForm.get('password')?.value,
            center: this.baseForm.get('center')?.value,
            position: this.baseForm.get('position')?.value,
            avatar: this.baseForm.get('avatar')?.value,
            confirmConditions: this.baseForm.get('confirmConditions')?.value,
            sendNews: this.baseForm.get('sendNews')?.value,
          },
        },
      })
      .subscribe(async (response) => {
        if (response.code === 'ok') {
          this.isLoading = true;

          const formData = {
            fullname: this.baseForm.get('fullname')?.value,
            nickname: this.baseForm.get('nickname')?.value,
            email: this.baseForm.get('email')?.value,
            password: this.baseForm.get('password')?.value,
            position: this.baseForm.get('position')?.value,
            avatar: this.baseForm.get('avatar')?.value,
            center: this.selectedCenter,
            confirmConditions: this.baseForm.get('confirmConditions')?.value,
            sendNews: this.baseForm.get('sendNews')?.value,
          };

          this.signUpService.postStepOne(formData).subscribe((response) => {
            if (response.code === 'ok') {
              this.isLoading = false;
              this.formEvent.emit({ step: 1, data: formData });
            } else {
              this.isLoading = false;
              response.errors.forEach((errorElement: any) => {
                if (errorElement.field === 'email')
                  this.emailValidatorMessage = errorElement.message;
                if (errorElement.field === 'nickname')
                  this.nicknameValidatorMessage = errorElement.message;
              });

              // response.errors.forEach((errorElement: any) => {
              //   this.baseForm
              //     .get(errorElement.field)
              //     ?.setErrors({ equal: true });
              // });
            }
          });
        }
      });
  }

  getEmailErrorMessage(): string {
    if (this.baseForm.get('email')?.hasError('pattern'))
      return 'Formato inválido';

    if (this.emailValidatorMessage) return this.emailValidatorMessage;
    return '';
  }

  getNicknameErrorMessage(): string {
    if (this.nicknameValidatorMessage) return this.nicknameValidatorMessage;
    return '';
  }

  continueInvalid() {
    this.signUpService.validateFormData({ data: '' }).subscribe((response) => {
      if (response.code === 'ok') {
        alert('Hay errores en el formulario base');
      }
    });
  }

  handleSelectCenter(event: any) {
    this.selectedCenter = event.data.center;
  }

  handleSelectPosition(event: any) {
    this.selectedPosition = event.name;

    this.baseForm.get('position')?.patchValue(event.code);
  }

  handleSelectAvatar(event: any) {
    this.selectedAvatar = event.data.avatar;
  }
  handleSwitch(input: string) {
    switch (input) {
      case 'confirmConditions':
        this.baseForm
          .get('confirmConditions')
          ?.patchValue(!this.baseForm.get('confirmConditions')?.value);
        break;
      case 'sendNews':
        this.baseForm
          .get('sendNews')
          ?.patchValue(!this.baseForm.get('sendNews')?.value);
        break;
      default:
        break;
    }
  }
}
