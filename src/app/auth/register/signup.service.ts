import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'environments/environment';
import { Center } from 'types';
import { sanatize } from 'utils';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private url: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  async getCenters(): Promise<Center[]> {
    const url = this.url + '/center/list';
    try {
      const response = await this.httpClient.get<Center[]>(url).toPromise();

      return response || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  postStepOne(data: any): Observable<any> {
    // send Http request
    const url = this.url + '/user/validateStep1';
    return this.httpClient.post(url, data).pipe(
      map((response) => {
        return { code: 'ok' };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error', errors: error.error.errors });
      })
    );
  }
  postSignup(data: any) {
    const url = this.url + '/user/register';
    return this.httpClient.post(url, data).pipe(
      map((response) => {
        return { code: 'ok' };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error' });
      })
    );
  }

  validateFormData(data: any) {
    // console.log(data.data.data);
    return of({ code: 'ok' });
  }

  async validateTeamName({
    teamName,
    centerId,
  }: {
    teamName: string;
    centerId: number;
  }) {
    const centers = await this.getCenters();
    // const url = this.url + '/team/validate/nameExists';
    // return this.httpClient.post(url, {
    //   name,
    // });
    if (centerId === 0) return of({ exist: false });

    const currentCenter = centers.find((center) => center.id === centerId) || {
      teams: [],
    };

    const teamNameExist =
      currentCenter.teams.filter(
        (team) => sanatize(team.name) === sanatize(teamName)
      ).length > 0;

    return of({ exist: teamNameExist });
  }
}
