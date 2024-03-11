import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { RoundCardComponent } from '../../components/round-card/round-card.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { RoundService } from '../round.service';
import { getFromStorage, setToStorage, removeStorage } from 'utils/storage';

@Component({
  selector: 'round-question-step',
  standalone: true,
  templateUrl: './question-step.component.html',
  styleUrl: './question-step.component.scss',
  imports: [RoundCardComponent, RadioButtonModule, FormsModule],
})
export class QuestionStepComponent implements OnInit {
  selectedAnswerId: any = null;
  loading: boolean = false;
  @Input() answers: any[] = [];

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor(private roundService: RoundService) {}

  ngOnInit(): void {}

  handleClick() {
    if (!this.selectedAnswerId) return;
    this.loading = true;

    this.roundService
      .postRoundAnswer(this.selectedAnswerId)
      .subscribe((response) => {
        this.formEvent.emit();
        this.loading = false;
        removeStorage('usedComodin');
      });
  }

  selectAnswer(answer: number) {
    this.selectedAnswerId = answer;
  }

  getLetterKeyById(index: number) {
    return String.fromCharCode(65 + index);
  }
}
