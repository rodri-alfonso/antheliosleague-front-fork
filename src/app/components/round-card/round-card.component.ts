import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonsComponent } from '../ui/buttons/buttons.component';

@Component({
  selector: 'app-round-card',
  standalone: true,
  imports: [ButtonsComponent],
  templateUrl: './round-card.component.html',
  styleUrl: './round-card.component.scss',
})
export class RoundCardComponent {
  @Input() label: string = '';
  @Input() classCard: string = '';
  @Output() onClickButton = new EventEmitter<any>();
  @Input() buttonLabel: string = '';
  @Input() disabledButton: boolean = false;
  @Input() loadingButton: boolean = false;

  handleClick() {
    this.onClickButton.emit();
  }
}
