import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { environment } from 'environments/environment';
import { Center } from 'types';

@Injectable({
  providedIn: 'root',
})
export class CentersService {
  private BASE_URL: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  async getCenters(): Promise<Center[]> {
    const url = this.BASE_URL + '/center/list';
    try {
      const response = await this.httpClient.get<Center[]>(url).toPromise();

      return response || [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
