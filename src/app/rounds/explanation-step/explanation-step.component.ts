import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoundCardComponent } from 'app/components/round-card/round-card.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import type { SelectedRoundResponse } from 'types/round';

@Component({
  selector: 'explanation-step',
  standalone: true,
  imports: [RoundCardComponent, ButtonsComponent],
  templateUrl: './explanation-step.component.html',
  styleUrl: './explanation-step.component.scss',
})
export class ExplanationStepComponent {
  @Output() formEvent: EventEmitter<any> = new EventEmitter();
  @Input() hasQueryParam: boolean = false;
  @Input() round: SelectedRoundResponse | null = null;

  constructor() {}

  handleClick() {
    this.formEvent.emit();
  }

  handleFinish() {
    this.formEvent.emit({
      finalStep: true,
    });
  }
}
