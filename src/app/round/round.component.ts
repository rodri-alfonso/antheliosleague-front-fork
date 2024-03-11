import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { Router } from '@angular/router';
import { InitialStepComponent } from './initial-step/initial-step.component';
import { FinalStepComponent } from './final-step/final-step.component';
import { InfoStepComponent } from './info-step/info-step.component';
import { QuestionStepComponent } from './question-step/question-step.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonsComponent } from '../components/ui/buttons/buttons.component';
import { RoundService } from './round.service';
import { getFromStorage, setToStorage } from 'utils/storage';
import { DelegateAutocompleteComponent } from 'app/components/delegate-autocomplete/delegate-autocomplete.component';
import type { RoundResponse, DelegateOption } from 'types/round';

@Component({
  selector: 'app-round',
  standalone: true,
  templateUrl: './round.component.html',
  styleUrl: './round.component.scss',
  imports: [
    AppLayoutComponent,
    QuestionStepComponent,
    InfoStepComponent,
    FinalStepComponent,
    InitialStepComponent,
    ButtonsComponent,
    DialogModule,
    DelegateAutocompleteComponent,
  ],
})
export class RoundComponent implements OnInit {
  isOpenModal: boolean = false;
  comodinType: string = '';
  hasComodin: boolean = true;
  isComodinVisible: boolean = false;
  step: number = 1;
  currentRound: RoundResponse = {} as RoundResponse;
  loadingComodin: boolean = false;
  selectedDelegate: DelegateOption | null = null;

  MAX_50_50_COMODIN_COUNT = 2;
  MAX_ANTHELIOS_COMODIN_COUNT = 3;

  constructor(private router: Router, private roundService: RoundService) {}

  ngOnInit(): void {
    if (this.roundService.currentRound?.status) {
      if (this.roundService.currentRound.status === 'answered') {
        this.router.navigate(['/home']);
        return;
      }

      this.currentRound = this.roundService.currentRound;

      const hasQuestionStorage = Boolean(
        getFromStorage('usedComodin')?.usedComodin?.length
      );

      if (hasQuestionStorage) {
        this.currentRound.round.roundCase.question.options =
          getFromStorage('usedComodin').usedComodin;
        this.hasComodin = false;
      }
    }

    this.roundService.getCurrentRound().subscribe(({ response, code }: any) => {
      if (response.status === 'answered') {
        this.router.navigate(['/home']);
        return;
      }

      this.currentRound = response;

      const hasQuestionStorage = Boolean(
        getFromStorage('usedComodin')?.usedComodin?.length
      );

      if (hasQuestionStorage) {
        this.currentRound.round.roundCase.question.options =
          getFromStorage('usedComodin').usedComodin;
        this.hasComodin = false;
      }

      switch (response.round.roundCase.question.comodinType) {
        case 'delegado':
          this.comodinType = 'delegado';
          break;
        case '50_50':
          this.comodinType = '50_50';
          break;
        default:
          this.hasComodin = false;
          break;
      }

      const isAvailableComodin =
        this.currentRound.remainsComodins['50_50'] <=
          this.MAX_50_50_COMODIN_COUNT &&
        this.currentRound.remainsComodins.anthelios <=
          this.MAX_ANTHELIOS_COMODIN_COUNT;
      if (!isAvailableComodin) this.hasComodin = false;
    });
  }

  onSelectDelegate(event: any) {
    this.selectedDelegate = event;
  }

  handleDelegateComodin() {
    this.loadingComodin = true;

    const parseMessageToWhatsapp = (message: string) => {
      return message.replace(/\s/g, '%20');
    };

    const PHONE_NUMBER = '+17137157533';
    const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${parseMessageToWhatsapp(
      '¡Hey! Necesito ayuda para conestar mi pregunta en Anthelios League. ¿Me puedes ayudar?'
    )}`;

    this.roundService.getComodin().subscribe(() => {
      this.toggleModal();
      this.loadingComodin = false;
      window.open(WHATSAPP_URL, '_blank');
      this.isComodinVisible = false;
      this.hasComodin = false;
    });
  }

  nextStep() {
    this.step++;
  }

  handleClickBackEvent() {
    if (this.step === 1 || this.step === 4) this.router.navigate(['/home']);
    else this.step--;
  }

  handleFormEvent(event: any) {
    if (this.step === 4) {
      this.router.navigate(['/home']);
      return;
    }

    if (this.step === 2) this.isComodinVisible = true;

    this.nextStep();
  }

  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  handleComodin() {
    this.loadingComodin = true;
    this.isComodinVisible = false;

    this.roundService.getComodin().subscribe(({ response, code }: any) => {
      if (response.options.length > 0) {
        this.currentRound.round.roundCase.question.options = response.options;
        this.toggleModal();
        setToStorage('usedComodin', response.options);
      }
      this.loadingComodin = false;
    });
  }
}
