import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AutocompleteComponent } from '../ui/autocomplete/autocomplete.component';
import { ButtonsComponent } from '../ui/buttons/buttons.component';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { InputComponent } from '../ui/input/input.component';
import { SelectComponent } from '../ui/select/select.component';
import { DialogModule } from 'primeng/dialog';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'profile-editor',
  standalone: true,
  imports: [
    AutocompleteComponent,
    ButtonsComponent,
    AuthLayoutComponent,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.scss',
})
export class ProfileEditorComponent {
  baseForm: FormGroup = new FormGroup({});
  @Input() user: any = null;
  currentUser: any = null;
  confirmationModal: boolean = false;
  loading: boolean = false;

  positions = [
    { name: 'Residente', code: 'RE' },
    { name: 'Adjunto', code: 'AD' },
    { name: 'Jefe de Servicio', code: 'JDS' },
  ];

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.baseForm = this.fb.group({
      fullname: [
        this.user.fullname,
        [Validators.required, Validators.minLength(3)],
      ],
      nickname: [
        this.user.nickname,
        [Validators.required, Validators.minLength(3)],
      ],
      password: [
        'XXXXXXX',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^.{5,}$'),
        ],
      ],
      // avatar: [false, [Validators.required]],
      position: [
        this.getPositionByCode(this.user.position),
        [Validators.required],
      ],
    });
  }

  getPositionByCode(code: 'RE' | 'AD' | 'JDS') {
    const positionsMap = {
      RE: 'Residente',
      AD: 'Adjunto',
      JDS: 'Jefe de Servicio',
    };
    return positionsMap[code];
  }

  getInitialPosition() {
    return this.positions.find(
      (position) => position.code === this.user.position
    );
  }

  handleSubmit() {
    const formData = {
      fullname: this.baseForm.get('fullname')?.value,
      nickname: this.baseForm.get('nickname')?.value,
      password: this.baseForm.get('password')?.value,
      position: this.baseForm.get('position')?.value,
      // avatar: this.baseForm.get('avatar')?.value,
    };

    this.updateUserInfo(formData);
  }

  updateUserInfo(data: any) {
    this.authService.updateUserInfo(data).subscribe((response: any) => {
      if (response.code === 'ok') {
        window.location.reload();
      }
    });
  }

  toggleConfirmationModal() {
    this.confirmationModal = !this.confirmationModal;
  }

  confirmDelete() {
    this.loading = true;

    this.authService.deleteAccount().subscribe((response: any) => {
      this.authService.internalLogout();
      this.loading = false;
      this.router.navigate(['/']);
      this.toggleConfirmationModal();
    });
  }
}
