import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = {
    name: 'Admin User',
    role: 'admin', // يمكن أن يكون 'user' أو 'admin'
  };

  apiUrl: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  getUserRole(): string {
    return this.currentUser.role;
  }

  // يمكنك إضافة المزيد من المنطق هنا لإعداد بيانات المستخدم الفعلية من API
}
