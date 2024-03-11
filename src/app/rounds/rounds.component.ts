import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ExplanationStepComponent } from './explanation-step/explanation-step.component';
import { InfoStepComponent } from './info-step/info-step.component';
import { QuestionStepComponent } from './question-step/question-step.component';
import { ButtonsComponent } from '../components/ui/buttons/buttons.component';
import { ResultsComponent } from './results/results.component';
import { RoundService } from 'app/round/round.service';
import { SpinnerComponent } from 'app/components/ui/spinner/spinner.component';
import type { RoundListItem } from 'types/round';

@Component({
  selector: 'app-rounds',
  standalone: true,
  templateUrl: './rounds.component.html',
  styleUrl: './rounds.component.scss',
  imports: [
    AppLayoutComponent,
    QuestionStepComponent,
    InfoStepComponent,
    ExplanationStepComponent,
    ButtonsComponent,
    ResultsComponent,
    SpinnerComponent,
  ],
})
export class RoundsComponent implements OnInit {
  step: number = 1;
  selectedRound: any = false;
  roundsTitle: string = 'Archivo';
  hasQueryParam: boolean = false;
  loading: boolean = true;
  loadingRoundId: number = 0;
  hasCorrectAnswer: boolean = false;

  rounds: RoundListItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roundService: RoundService
  ) {}

  ngOnInit(): void {
    this.roundService.getRoundsList().subscribe((response: any) => {
      this.rounds = response.rows;
      this.loading = false;
    });

    const queryParam = this.route.snapshot.queryParamMap.get('query');
    if (queryParam) {
      this.hasQueryParam = true;
      this.selectedRound = this.rounds.find(
        (round: any) => round.round === queryParam
      );
      this.roundsTitle = 'Resultados';
    }

    if (queryParam) {
      this.roundService
        .getClosedRoundById(Number(queryParam))
        .subscribe((response: any) => {
          this.selectedRound = {
            ...response.round,
            userChoice: response.userChoice,
          };

          const correctAnswerId =
            response.round.roundCase.question.options.find(
              (answer: any) => answer.correct
            )?.id || 0;

          const selectedAnswerId =
            response.round.roundCase.question.options.find(
              (option: any) => option.id === response.userChoice.option_id
            )?.id || 0;

          this.hasCorrectAnswer = correctAnswerId === selectedAnswerId;

          this.loading = false;
        });
    }
  }

  nextStep() {
    this.step++;
  }

  handleSelectRound(roundId: number) {
    this.loadingRoundId = roundId;

    this.roundService.getClosedRoundById(roundId).subscribe((response: any) => {
      this.selectedRound = {
        ...response.round,
        userChoice: response.userChoice,
      };
      this.loadingRoundId = 0;
    });
  }

  handleClickBackEvent() {
    if (this.roundsTitle === 'Resultados' && this.step === 1) {
      this.router.navigate(['/home']);
      return;
    }

    if (this.step === 0) {
      this.step = 2;
      return;
    }

    if (!this.selectedRound) {
      this.router.navigate(['/home']);
      return;
    } else {
      if (this.step === 1) this.selectedRound = null;
      else this.step--;
    }
  }

  handleFormEvent(event: any) {
    const queryParam = this.route.snapshot.queryParamMap.get('query');

    if (queryParam && event?.finalStep) {
      this.router.navigate(['/home']);
    }

    if (!queryParam && event?.finalStep) {
      this.step = 1;
      this.selectedRound = null;
    }

    if (event?.stepInfo) {
      this.step = 0;
      return;
    }

    if (this.step === 0) {
      this.step = 3;
      return;
    }

    this.nextStep();
  }
}
