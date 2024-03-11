import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewRef,
} from '@angular/core';
import { SignUpSuccessComponent } from 'app/auth/register/signup-success/signup-success.component';
import { SkeletonModule } from 'primeng/skeleton';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { ScoreCardComponent } from 'app/components/score-card/score-card.component';
import { CountdownComponent } from 'app/components/ui/countdown/countdown.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { RouterLink } from '@angular/router';
import { RoundService } from 'app/round/round.service';
import { ChangeDetectorRef } from '@angular/core';
import { SpinnerComponent } from 'app/components/ui/spinner/spinner.component';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import type { ScoreInfo } from 'types/round';
import { getFromStorage, setToStorage } from 'utils/storage';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SignUpSuccessComponent,
    SkeletonModule,
    AppLayoutComponent,
    ScoreCardComponent,
    CountdownComponent,
    ButtonsComponent,
    RouterLink,
    SpinnerComponent,
    DialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  endRoundDate: any = null;
  wasAnsweredRound: boolean = false;
  loading: boolean = true;
  hideCounter: boolean = false;
  visibleAnsweredModal: boolean = false;
  userLoading: boolean = true;
  currentRoundId = 0;
  currentRoundNumber = 0;
  lastClosedRoundNumber = 0;

  answeredModalStorage = getFromStorage('answeredModal')?.answeredModal;

  scoreInfo: ScoreInfo = {
    team: {
      avatar: 0,
      name: '',
      center: '',
      points: 0,
    },
    user: {
      avatar: 0,
      name: '',
      points: 0,
    },
  };

  constructor(
    private roundService: RoundService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    if (this.authService.userInfo) {
      this.scoreInfo = {
        user: {
          avatar: this.authService.userInfo.avatar,
          name: this.authService.userInfo.nickname,
          points: this.authService.userInfo.points,
        },
        team: {
          avatar: this.authService.userInfo.team.avatar,
          name: this.authService.userInfo.team.name,
          center: this.authService.userInfo.center.name,
          points: this.authService.userInfo.team.points,
        },
      };
      this.userLoading = false;
    } else {
      this.authService.getUserInfo().subscribe(({ user }: any) => {
        this.scoreInfo = {
          user: {
            avatar: user.avatar,
            name: user.nickname,
            points: user.points,
          },
          team: {
            avatar: user.team.avatar,
            name: user.team.name,
            center: user.center.name,
            points: user.team.points,
          },
        };

        this.userLoading = false;
        this.changeDetector.detectChanges();
      });
    }

    this.roundService.getCurrentRound().subscribe(({ response, code }: any) => {
      if (response.status) {
        if (!(this.changeDetector as ViewRef).destroyed) {
          this.changeDetector.detectChanges();
        }
        this.currentRoundId = response.round.id;
        this.currentRoundNumber = response.round.number;
        this.lastClosedRoundNumber = response.round.number - 1;
        this.wasAnsweredRound = response.status === 'answered';

        if (response.status === 'pending') {
          this.visibleAnsweredModal = false;
          setToStorage('answeredModal', {
            closed: false,
            round: null,
          });
        }

        this.endRoundDate = new Date(response.round.endAt);
        this.loading = false;
        this.changeDetector.detectChanges();
      } else {
        if (response.nextRoundStartsAt) {
          this.endRoundDate = new Date(response.nextRoundStartsAt);

          if (!this.answeredModalStorage?.closed)
            this.visibleAnsweredModal = true;
          this.lastClosedRoundNumber = response.nextRound - 1;
        } else {
          this.hideCounter = true;
          if (this.answeredModalStorage?.closed)
            this.lastClosedRoundNumber = this.answeredModalStorage?.round + 1;
          this.wasAnsweredRound = true;
        }

        this.loading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  handleCickDialog() {
    if (!this.answeredModalStorage?.closed) {
      this.handleCloseDialog();
    }

    this.router.navigate(['/rounds'], {
      queryParams: { query: this.lastClosedRoundNumber },
    });
  }

  handleCickPlay() {
    if (this.wasAnsweredRound) {
      this.handleCickDialog();
      return;
    } else this.router.navigate(['/round']);
  }

  handleClickRanking() {
    if (this.currentRoundNumber === 1) return;
    else this.router.navigate(['/rankings']);
  }

  handleCloseDialog() {
    this.visibleAnsweredModal = false;
    setToStorage('answeredModal', {
      closed: true,
      round: this.lastClosedRoundNumber,
    });
  }
}
