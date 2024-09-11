import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrl: './viewinvoice.component.css',
})
export class ViewinvoiceComponent {
  apiUrl: string;
  viewinvoice: any;
  id: any;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.getViewinvoice();
  }
  getViewinvoice(): void {
    const url = `${this.apiUrl}/api/invoices/${this.id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(url, { headers }).subscribe(
      (data) => {
        console.log('viewinvoice:', data);
        this.viewinvoice = data.data;
      },
      (error) => {
        console.error('Error fetching viewinvoice:', error);
      }
    );
  }
}
