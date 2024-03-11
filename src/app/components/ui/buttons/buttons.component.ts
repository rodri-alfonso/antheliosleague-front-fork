import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  @Input({ required: true }) text: string = '';
  @Input({ required: true }) classBtn: string = '';
  @Input() disable: boolean = false;
  @Input() loading: boolean = false;

  @Output() onClick = new EventEmitter<any>();

  handleClick() {
    this.onClick.emit();
  }
}
