import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AvatarSelectComponent),
  multi: true,
};

@Component({
  selector: 'app-avatar-select',
  standalone: true,
  imports: [DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './avatar-select.component.html',
  styleUrls: ['./avatar-select.component.scss'],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR],
})
export class AvatarSelectComponent implements ControlValueAccessor {
  selectedAvatar: any = null;

  @Input() placeholder: string = '';
  @Input() options: any[] = [];
  @Input({ required: true }) optionsType: 'avatars' | 'logos' = 'avatars';

  teamForm: FormGroup = new FormGroup({});

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  logos: any[] = [
    { code: 1 },
    { code: 2 },
    { code: 3 },
    { code: 4 },
    { code: 5 },
    { code: 6 },
    { code: 7 },
    { code: 8 },
    { code: 9 },
  ];

  avatars: any[] = [
    { code: 1 },
    { code: 2 },
    { code: 3 },
    { code: 4 },
    { code: 5 },
    { code: 6 },
  ];

  onChange(event: any) {
    this.formEvent.emit(event.value);
  }

  handleAvatarChange(event: any) {
    this.selectedAvatar = null;
    this.changeAvatar(null);
  }

  onChanged: Function = () => {};
  onTouched: Function = () => {};
  onWriteValue: Function = () => {};

  changeAvatar(avatarId: number | null) {
    // this.selectedAvatar = avatarId;
    this.onChanged(avatarId);
  }

  registerOnChange(fn: Function) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(): void {}
}
