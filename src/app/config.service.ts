import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private apiUrl: string;
  private token: string;
  getAuthToken: any;

  constructor(private Http: HttpClient) {
    this.apiUrl = 'http://localhost:8000';
    this.token = '';
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getToken(): string {
    return this.token;
  }

  getUserLogedIn(): Observable<any> {
    console.log(this.apiUrl, 'this.apiUrlthis.apiUrl');
    return this.Http.get<any>(`${this.apiUrl}/api/auth/me`);
  }

  setToken(token: string): void {
    this.token = token;
  }
}
