import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoundCardComponent } from 'app/components/round-card/round-card.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';

@Component({
  selector: 'round-final-step',
  standalone: true,
  imports: [RoundCardComponent, ButtonsComponent],
  templateUrl: './final-step.component.html',
  styleUrl: './final-step.component.scss',
})
export class FinalStepComponent {
  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor() {}

  handleClick() {
    this.formEvent.emit({ step: 1, data: { name: 'John Doe' } });
  }
}
