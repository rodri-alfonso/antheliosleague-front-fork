import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { setTokenStorage, tokenStorage, removeStorage } from 'utils/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL: string = environment.apiUrl;
  token: string = tokenStorage();
  userInfo: any = null;

  constructor(private httpClient: HttpClient) {}

  postLogout() {
    const url = this.BASE_URL + '/auth/logout';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.post(url, {}, { headers: headers }).pipe(
      map((response: any) => {
        this.internalLogout();
        return { code: 'ok' };
      })
    );
  }

  internalLogout() {
    this.token = '';
    removeStorage('token');
    this.userInfo = null;
  }

  postLogin(data: any) {
    const url = this.BASE_URL + '/auth/login';

    return this.httpClient.post(url, data).pipe(
      map((response: any) => {
        this.token = response.notification.token;
        setTokenStorage(response.notification.token);
        return { code: 'ok' };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error' });
      })
    );
  }

  changePassword(data: any) {
    const url = this.BASE_URL + '/auth/reset';

    return this.httpClient.post(url, data).pipe(
      map((response: any) => {
        return { code: 'ok', message: response.message };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error', message: error.error.message });
      })
    );
  }
  postNewPassword({ password, token }: { password: string; token: string }) {
    const url = this.BASE_URL + '/auth/password-reset';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(
        url,
        {
          password,
        },
        {
          headers,
        }
      )
      .pipe(
        map((response: any) => {
          return { code: 'ok' };
        }),
        catchError((error) => {
          console.error(error);
          return of({ code: 'error', message: error.error.message });
        })
      );
  }

  getToken() {
    return this.token;
  }

  getUserInfo() {
    const url = this.BASE_URL + '/auth/info';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.get(url, { headers: headers }).pipe(
      map((response: any) => {
        this.userInfo = response.user;
        return { ...response };
      }),
      catchError((error) => {
        console.error(error);
        return of({ code: 'error', message: error.error.message });
      })
    );
  }

  getTeamInfoById(id: number) {
    const url = this.BASE_URL + '/team/byId';

    return this.httpClient.post(url, { teamId: id });
  }

  updateUserInfo(data: any) {
    const url = this.BASE_URL + '/user/update';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.post(url, data, { headers: headers });
  }

  deleteAccount() {
    const url = this.BASE_URL + '/user/delete';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.delete(url, { headers: headers });
  }
}
