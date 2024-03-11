import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';

@Component({
  selector: 'round-initial-step',
  standalone: true,
  imports: [ButtonsComponent],
  templateUrl: './initial-step.component.html',
  styleUrl: './initial-step.component.scss',
})
export class InitialStepComponent {
  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();
  @Input() currentRoundNumber: number = 1;

  constructor() {}

  handleClick() {
    this.formEvent.emit();
  }
}
