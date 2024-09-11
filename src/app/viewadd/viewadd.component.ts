import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

export interface viewUser {
  username: 'string';
  full_name: 'string';
  email: 'string';
  phone: '';
  status: 'string';
  type: 'string';
  photo: 'string';
  id_number: 'string';
  gender: 'string';
}

@Component({
  selector: 'app-viewadd',
  templateUrl: './viewadd.component.html',
  styleUrl: './viewadd.component.css',
})
export class ViewaddComponent implements OnInit {
  user: any = {
    username: '',
    full_name: '',
    email: '',
    phone: '',
    status: '',
    type: '',
    photo: '',
    id_number: '',
    gender: '',
  };

  private apiUrl: string;
  private userId: any;
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
      console.log(this.userId, 'this.userId');
    });
    const url = `${this.apiUrl}/api/users/${this.userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.fetchUser();
  }

  getUser(): Observable<viewUser> {
    const url = `${this.apiUrl}/api/users/${this.userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<viewUser>(url, { headers });
  }

  fetchUser() {
    this.getUser().subscribe((data: any) => {
      console.log(data, 'user data');
      this.user = data.data;
      if (!this.user.photo || this.user.photo == '') {
        if (this.user.gender == 'male')
          this.user.photo = '../../assets/avater man.png';
        else this.user.photo = '../../assets/avater girl.png';
      }
      console.log(this.user, ' this.user  this.user ');
      return this.user;
    });
  }

  deleteUser() {
    const url = `${this.apiUrl}/api/users/delete/?id=${this.userId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(url, { headers }).subscribe((response) => {
      this.router.navigate(['/users']);
    });
  }

  navigateToEditUser() {
    this.router.navigate(['/edite'], { queryParams: { id: this.userId } });
  }
}
