import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  private apiUrl: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$'),
        ],
      ],
    });
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .post<{ token: string }>(
          `${this.apiUrl}/api/auth/login`,
          this.loginForm.value
        )
        .subscribe(
          (response: any) => {
            console.log('Response from API', response.data);
            localStorage.setItem('token', response.data.access_token);
            this.router.navigate(['/listing']);
            localStorage.setItem('user_type', response.data.type);
            console.log(response.data.type, 'response.type');
          },
          (error) => {
            console.error('Error from API', error.error.message);
          }
        );
    }
  }
}
