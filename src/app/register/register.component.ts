import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  private apiUrl: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private authService: AuthService // حقن AuthService
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).+$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      id_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{6,10}$')],
      ],
      // Validate ID number
      gender: ['male', Validators.required],
      status: ['active'],
      type: ['customer'],
      full_name: ['username'],
    });
  }

  onSubmit() {
    console.log('my_url_000', this.apiUrl);
    this.registerForm.value.full_name = this.registerForm.value.username;
    if (this.registerForm.valid) {
      this.http
        .post(`${this.apiUrl}/api/auth/register`, this.registerForm.value)
        .subscribe(
          (response) => {
            console.log('Response from API', response);
            this.router.navigate(['/login']);
          },

          (error) => {
            console.error('Error from API', error);
          }
        );
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get idNumber() {
    return this.registerForm.get('idNumber');
  }
}
