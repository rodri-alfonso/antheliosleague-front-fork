import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { TabViewModule } from 'primeng/tabview';
import { RankingComponent } from '../components/ranking/ranking.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamsRanking, UsersRanking } from 'types/ranking';
import { RankingsService } from 'app/services/rankings/rankings.service';

@Component({
  selector: 'app-rankings',
  standalone: true,
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.scss',
  imports: [AppLayoutComponent, TabViewModule, RankingComponent],
})
export class RankingsComponent implements OnInit {
  activeIndexChange: number = 0;

  usersRanking: any[] = [];
  teamsRanking: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rankingService: RankingsService
  ) {}

  ngOnInit() {
    const queryParam = this.route.snapshot.queryParamMap.get('query');
    if (queryParam) {
      this.activeIndexChange = queryParam === 'team' ? 0 : 1;
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  handleChangeTab(event: any) {
    const BASE_URL_QUERY = '/rankings?query=';
    const instance = this.activeIndexChange === 0 ? 'team' : 'user';
    window.location.hash = BASE_URL_QUERY.concat(instance);

    setTimeout(() => {
      this.scrollToPosition(instance);
    }, 1000);
  }

  getRanking(instance: 'user' | 'team' = 'team') {
    this.rankingService.getRankings(instance).subscribe((response) => {
      if (response.code === 'ok') {
        if (instance === 'user') {
          this.usersRanking = this.insertarPosicion(response.response);
        } else {
          this.teamsRanking = this.insertarPosicion(response.response);
        }
        setTimeout(() => {
          this.scrollToPosition(instance);
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

  scrollToPosition(instance: string) {
    const targetElement = document.querySelector('.' + instance + '-position');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'instant' });
    }
  }
}
