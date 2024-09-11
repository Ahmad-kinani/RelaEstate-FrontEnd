import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

// تعريف واجهة البيانات للعقار
export interface RealEstate {
  data: RealEstate | undefined;
  address: string;
  type: string;
  price: number;
  details: string;
  garage: string;
  section: string;
  property: string;
  balcony: string;
  furniture: string;
  status: string;
  lock_date?: string;
  months?: number;
  currency: any;
  photos: any[];
}

// تعريف واجهة البيانات للعملة
export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
  is_active: number;
}

@Component({
  selector: 'app-viewrealestate',
  templateUrl: './viewrealestate.component.html',
  styleUrls: ['./viewrealestate.component.css'],
})
export class ViewRealEstateComponent implements OnInit {
  realEstate?: RealEstate;
  currencies: Currency[] = []; // مصفوفة العملات
  private apiUrl: string;
  private realEstateId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  ngOnInit(): void {
    this.realEstateId = this.route.snapshot.paramMap.get('id');
    this.fetchRealEstate();
    console.log(this.realEstateId, 'realEstateId');
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

  fetchRealEstate() {
    this.getRealEstate().subscribe(
      (data: any) => {
        this.realEstate = data.data;
        if (!this.realEstate?.photos || this.realEstate?.photos.length === 0) {
        }
        console.log(this.realEstate, 'Real estate data');
      },
      (error) => {
        console.error('Error fetching real estate data:', error);
      }
    );
  }

  deleteRealEstate() {
    const url = `${this.apiUrl}/api/realEstate/delete?id=${this.realEstateId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(url, { headers }).subscribe(() => {
      this.router.navigate(['/listing']);
    });
  }

  navigateToEditRealEstate() {
    if (this.realEstateId) {
      this.router.navigate([`/editrealestate/${this.realEstateId}`]);
    }
  }
}
