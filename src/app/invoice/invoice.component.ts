import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { RealEstate } from '../viewrealestate/viewrealestate.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoice: any = {};
  invoices: any[] = [];
  apiUrl: string;
  RealEstate?: RealEstate; // Optional since it might not be set immediately
  realEstateId: string | null = null;
  user: any;
  currency: any;
  method: any;
  paymentMethods: any[] = [];
  type: any;
  currentDateTime!: string;
  addInvoices: any;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  ngOnInit(): void {
    this.currentDateTime = this.getCurrentDateTime();
    this.invoice.date = this.currentDateTime;
    this.route.queryParams.subscribe((params) => {
      this.realEstateId = params['real_estate_id'];
      this.type = params['type'];
      console.log('Real Estate ID:', this.realEstateId);
      console.log('Type:', this.type);
    });
    console.log(this.realEstateId, 'real_estate_id');

    if (this.realEstateId) {
      this.getRealEstate().subscribe(
        (data: RealEstate) => {
          console.log('Real estate data:', data);
          this.RealEstate = data.data;
        },
        (error) => {
          console.error('Error fetching real estate data:', error);
        }
      );
    } else {
      console.error('Real estate ID is not set');
    }

    this.getUser();
    this.getMethodPayments();
  }

  getCurrentDateTime(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getRealEstate(): Observable<RealEstate> {
    if (!this.realEstateId) {
      throw new Error('Real estate ID is not set');
    }
    const url = `${this.apiUrl}/api/realEstate/${this.realEstateId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<RealEstate>(url, { headers });
  }

  getUser(): void {
    const url = `${this.apiUrl}/api/auth/me`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(url, { headers }).subscribe(
      (data) => {
        console.log('User data:', data);
        this.user = data.data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  getAddInvoices(): void {
    const url = `${this.apiUrl}/api/invoices`;
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      type: this.type.toLowerCase() == 'rent' ? 'rented' : 'sold',
      details: this.RealEstate?.details || '',
      method_payment_id: this.invoice.method_payment_id || null,
      date: this.invoice.date || '',
      price: this.RealEstate?.price || null,
      currency_id: this.RealEstate?.currency?.id || null,
      real_estate_id: this.realEstateId || null,
    };

    this.http.post<any>(url, body, { headers }).subscribe(
      (data) => {
        console.log('Invoice data:', data);
        this.addInvoices = data.data;
        this.router.navigate(['/viewinvoice'], {
          queryParams: { id: this.addInvoices?.id },
        });
      },
      (error) => {
        console.error('Error fetching invoices data:', error);
      }
    );
  }

  getMethodPayments(): void {
    const url = `${this.apiUrl}/api/settings/getMethodPayments`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(url, { headers }).subscribe(
      (data) => {
        console.log('Payment methods:', data);
        this.paymentMethods = data;
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }
}
