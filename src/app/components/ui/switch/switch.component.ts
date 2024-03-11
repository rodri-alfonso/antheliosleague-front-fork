import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [InputSwitchModule, FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Input() inputName: string = '';

  radioValue: boolean = false;

  @Output() acceptptTermsChange = new EventEmitter<boolean>();

  onChangeValue(e: any) {
      this.radioValue = !this.radioValue;
      this.acceptptTermsChange.emit(this.radioValue);
  }
}
