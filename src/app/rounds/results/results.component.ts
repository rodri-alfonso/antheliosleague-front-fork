import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ButtonsComponent } from '../../components/ui/buttons/buttons.component';
import { RoundCardComponent } from '../../components/round-card/round-card.component';
import type { Round, ScoreInfo } from 'types/round';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  imports: [ButtonsComponent, RoundCardComponent],
})
export class ResultsComponent implements OnInit {
  userLoading: boolean = false;

  scoreInfo = {
    team: {
      avatar: 0,
      points: 0,
    },
    user: {
      avatar: 0,
      points: 0,
    },
  };

  @Input() round: Round | null = null;
  @Input() hasCorrectAnswer: boolean = false;
  @Input() userChoice: any = null;
  @Input() roundNumber: number = 0;
  @Output() formEvent: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.userInfo) {
      this.scoreInfo = {
        user: {
          avatar: this.authService.userInfo.avatar,
          points: this.authService.userInfo.points,
        },
        team: {
          avatar: this.authService.userInfo.team.avatar,
          points: this.authService.userInfo.team.points,
        },
      };
    } else {
      this.userLoading = true;
      this.authService.getUserInfo().subscribe(({ user }: any) => {
        this.scoreInfo = {
          user: {
            avatar: user.avatar,
            points: user.points,
          },
          team: {
            avatar: user.team.avatar,
            points: user.team.points,
          },
        };

        this.userLoading = false;
      });
    }
  }

  handleClick() {
    this.formEvent.emit({ finalStep: true });
  }
}
