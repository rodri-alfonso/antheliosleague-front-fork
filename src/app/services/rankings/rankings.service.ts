import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from 'app/auth/auth.service';
import { Observable, catchError, map, of } from 'rxjs';
import type { TeamsRanking, UsersRanking } from 'types/ranking';

@Injectable({
  providedIn: 'root',
})
export class RankingsService {
  private BASE_URL: string = environment.apiUrl;

  usersRanking: UsersRanking[] = [];
  teamsRanking: TeamsRanking[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getRankings(instance: 'user' | 'team') {
    const url = `${this.BASE_URL}/${instance}/ranking`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get(url, { headers: headers }).pipe(
      map((response: any) => {
        if (instance === 'user') {
          this.usersRanking = response;
        } else {
          this.teamsRanking = response;
        }
        return { code: 'ok', response };
      }),
      catchError((error) => {
        return of({
          code: 'error',
          message: error.error.message,
          response: null,
        });
      })
    );
  }
}
