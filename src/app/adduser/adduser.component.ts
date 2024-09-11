import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  userForm!: FormGroup;
  private apiUrl: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^\\d{6,10}$')]],
      status: ['', Validators.required],
      type: ['', Validators.required],
      gender: ['', Validators.required],
      id_number: ['', Validators.required],
      photo: [], // We will handle file separately
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.userForm.patchValue({
        photo: file,
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.get(key);
        if (control && control.value !== null) {
          formData.append(key, control.value);
        }
      });

      this.submitForm(formData).subscribe(
        (response) => {
          console.log('Form Submitted Successfully', response);
          // Redirect to viewadd page with form data as queryParams
          this.router.navigate(['/viewadd'], {
            queryParams: { id: response.data.id },
          });
        },
        (error) => {
          console.error('Error Submitting Form', error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  getHeaders(): HttpHeaders {
    const token = this.configService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  submitForm(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/api/users`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(url, formData, { headers });
  }
}
