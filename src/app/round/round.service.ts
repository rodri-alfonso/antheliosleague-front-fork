import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import type { RoundResponse } from 'types/round';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private BASE_URL: string = environment.apiUrl;
  currentRound: RoundResponse | null = null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCurrentRound() {
    const url = this.BASE_URL + '/round/current';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get(url, { headers: headers }).pipe(
      map((response: any) => {
        this.currentRound = response;
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

  getComodin() {
    const url = this.BASE_URL + '/question/comodin';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get(url, { headers: headers }).pipe(
      map((response: any) => {
        this.currentRound = response;
        return { code: 'ok', response };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error', message: error.error.message });
      })
    );
  }

  postRoundAnswer(answerId: number) {
    const url = this.BASE_URL + '/round/answer';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.post(
      url,
      { option_id: answerId },
      { headers: headers }
    );
  }

  getDelegateList() {
    const url = this.BASE_URL + '/delegate/list';
    return this.httpClient.get(url);
  }

  getRoundsList() {
    const url = this.BASE_URL + '/round/list/closed';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get(url, { headers: headers });
  }

  getClosedRoundById(roundId: number) {
    const url = this.BASE_URL + '/round/closed/' + roundId;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
    });

    return this.httpClient.get(url, { headers: headers });
  }
}
