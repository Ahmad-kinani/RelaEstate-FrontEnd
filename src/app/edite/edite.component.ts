import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css'],
})
export class EditeComponent implements OnInit {
  user: any = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
    status: '',
    type: '',
    photo: '',
    password: '',
    id_number: '',
    gender: '',
  };

  statusOptions = ['active', 'inactive'];
  typeOptions = ['admin', 'user'];
  genderOptions = ['male', 'female'];

  private apiUrl: string;
  private userId: any;
  reviewPhoto: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id'];

      if (this.userId) {
        this.fetchUser();
      }
    });
  }

  getUser() {
    const url = `${this.apiUrl}/api/users/${this.userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  fetchUser() {
    this.getUser().subscribe(
      (data: any) => {
        console.log('Fetched user data:', data);
        this.user = data.data;
        this.reviewPhoto = this.user.photo;
        // Ensure password is correctly fetched and assigned
        console.log('Fetched user password:', this.user.password);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.reviewPhoto = reader.result;
      };
      reader.readAsDataURL(file);
      this.user.photo = file; // Store the file in the user object
    }
  }

  updateUser() {
    const url = `${this.apiUrl}/api/users/${this.userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.put(url, this.user, { headers }).subscribe((response) => {
      console.log('User updated successfully', response);
      this.router.navigate(['/viewadd'], { queryParams: { id: this.userId } });
    });
  }

  navigateToEditUser(userId: any) {
    this.router.navigate(['/edite'], { queryParams: { id: userId } });
  }
}
