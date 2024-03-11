import { Component, Input, OnInit } from '@angular/core';
import { ScoreCardComponent } from '../score-card/score-card.component';
import { ActivatedRoute } from '@angular/router';
import { RankingsService } from 'app/services/rankings/rankings.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
  imports: [ScoreCardComponent],
})
export class RankingComponent implements OnInit {
  ranking: any[] = [];
  @Input() isTeam: boolean = true;

  instance: string = this.isTeam ? 'logos' : 'avatars';

  userData: {
    idUser: number;
    idTeam: number;
  } = {
    idUser: 0,
    idTeam: 0,
  };

  top: any[] = [];

  list: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private rankingService: RankingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.top = this.ranking.slice(0, 3);
    this.list = this.ranking.slice(3);
    // const queryParam = this.route.snapshot.queryParamMap.get('query');
    this.getRanking();

    if (!this.authService.userInfo) {
      this.authService.getUserInfo().subscribe(({ user }: any) => {
        this.userData = {
          idUser: user.id,
          idTeam: user.team.id,
        };
      });
    } else {
      this.userData = {
        idUser: this.authService.userInfo.id,
        idTeam: this.authService.userInfo.team.id,
      };
    }
  }

  getRanking() {
    this.rankingService
      .getRankings(this.isTeam ? 'team' : 'user')
      .subscribe((response) => {
        if (response.code === 'ok') {
          this.ranking = this.insertarPosicion(response.response) as any[];

          this.top = this.ranking.slice(0, 3);
          this.list = this.ranking.slice(3);

          setTimeout(() => {
            this.scrollToPosition();
          }, 1000);
        }
      });
  }

  insertarPosicion(array: any[]) {
    let initialArray = [...array];
    for (let i = 0; i < array.length; i++) {
      initialArray[i].position = i + 1;
    }
    return initialArray;
  }

  scrollToPosition() {
    const instance = this.isTeam ? 'team' : 'user';
    const targetElement = document.querySelector('.' + instance + '-position');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'instant' });
    }
  }
}
