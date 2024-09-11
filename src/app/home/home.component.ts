import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  private apiUrl: string;
  user: any;
  user_type: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {
    this.apiUrl = `${this.configService.getApiUrl()}/api/auth/logout`;
  }
  ngOnInit(): void {
    this.user_type = localStorage.getItem('user_type');
    console.log(this.user_type, 'this.user_type ');
    setInterval(() => {
      this.user_type = localStorage.getItem('user_type');
    }, 100);
  }

  getUserLogedIn() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    const confirmLogout = window.confirm('Are you sure you want to log out ?');

    if (confirmLogout) {
      this.performLogout().subscribe(
        (response) => {
          console.log('Logout successful', response);

          this.clearToken();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout failed', error);
        }
      );
    }
  }

  private performLogout(): Observable<any> {
    return this.http.post(this.apiUrl, {}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error during logout request', error);
        return of(error);
      })
    );
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
