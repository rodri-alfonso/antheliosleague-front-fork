import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoundCardComponent } from '../../components/round-card/round-card.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { ExplanationStepComponent } from '../explanation-step/explanation-step.component';
import { Router } from '@angular/router';
import type { SelectedRoundResponse, QuestionOption } from 'types/round';

@Component({
  selector: 'round-question-step',
  standalone: true,
  templateUrl: './question-step.component.html',
  styleUrls: [
    './question-step.component.scss',
    '../../round/question-step/question-step.component.scss',
  ],
  imports: [
    RoundCardComponent,
    RadioButtonModule,
    FormsModule,
    ButtonsComponent,
    ExplanationStepComponent,
  ],
})
export class QuestionStepComponent implements OnInit {
  @Input() hasQueryParam: boolean = false;
  @Input() round: SelectedRoundResponse | null = null;

  selectedAnswerId: number = 0;
  correctAnswerId: number = 0;

  hasCorrectAnswer: boolean = false;

  emptyAnswer: any = null;
  showInfo: boolean = false;

  answers: QuestionOption[] = [];

  @Output() formEvent: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    this.answers = this.round?.roundCase?.question?.options || [];
    this.correctAnswerId =
      this.round?.roundCase?.question?.options.find((answer) => answer.correct)
        ?.id || 0;

    this.selectedAnswerId =
      this.round?.roundCase.question.options.find(
        (option) => option.id === this.round?.userChoice.option_id
      )?.id || 0;
    this.hasCorrectAnswer = this.correctAnswerId === this.selectedAnswerId;
  }

  handleClick() {
    this.formEvent.emit();
  }

  getQuestionStyleById(id: number) {
    if (!this.hasQueryParam && this.correctAnswerId !== id) return '';

    if (this.selectedAnswerId === id) {
      if (this.hasCorrectAnswer) return 'answers__selected';
      else return 'answers__wrong';
    }

    if (this.correctAnswerId === id) return 'answers__selected';

    return '';
  }
  getLetterKeyById(index: number) {
    return String.fromCharCode(65 + index);
  }

  handleFinish() {
    this.formEvent.emit({
      finalStep: true,
    });
  }

  toggleInfo() {
    this.formEvent.emit({
      stepInfo: true,
    });
  }
}
