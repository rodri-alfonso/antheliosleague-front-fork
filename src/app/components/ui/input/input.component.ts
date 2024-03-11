import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor {
  @Input() text: string = '';
  @Input() classBtn = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() errorMessage: string = '';
  @Input() value: string = '';
  @Input() eyeIcon: boolean = false;
  @Input() formControlName: string = '';
  @Input() required: boolean = false;
  @Input() initialValue: string = '';
  @Input() profileClass: boolean = false;

  public showPassword: boolean = false;

  constructor() {}

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text';
      this.showPassword = true;
    } else {
      this.type = 'password';
      this.showPassword = false;
    }
  }

  onChanged: Function = () => {};
  onTouched: Function = () => {};
  onWriteValue: Function = () => {};

  customChanged(e: any) {
    this.onChanged(e.target.value);
  }

  registerOnChange(fn: Function) {
    this.onChanged = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }

  writeValue(): void {}
}
