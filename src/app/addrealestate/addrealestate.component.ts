import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-addrealestate',
  templateUrl: './addrealestate.component.html',
  styleUrls: ['./addrealestate.component.css'],
})
export class AddrealestateComponent implements OnInit {
  realEstateForm!: FormGroup;
  statusOptions = ['to sale', 'to rent', 'sold', 'rented'];
  private apiUrl: string;
  photos: any;
  selectedStatus: string = '';
  currencies: any[] = []; // مصفوفة العملات

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiUrl = `${this.configService.getApiUrl()}/api/realEstate`;
  }

  ngOnInit(): void {
    this.realEstateForm = this.fb.group({
      address: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      details: ['', Validators.required],
      garage: ['', Validators.required],
      section: ['active', Validators.required],
      property: ['user', Validators.required],
      balcony: ['', Validators.required],
      furniture: ['', Validators.required],
      status: ['', Validators.required],
      lock_date: ['', Validators.required],
      months: [0],
      currency_id: ['', Validators.required], // تهيئة الحقل
      photos: [null],
    });
    this.currencies = [
      { id: 1, name: 'Syrian Pound', code: 'SP', symbol: 'ل.س' },
      { id: 2, name: 'US Dollar', code: 'USD', symbol: '$' },
      { id: 3, name: 'Euro', code: 'EUR', symbol: '€' },
    ];

    this.realEstateForm.get('status')?.valueChanges.subscribe((value) => {
      this.selectedStatus = value;

      if (this.selectedStatus === 'sold' || this.selectedStatus === 'rented') {
        this.realEstateForm.get('months')?.clearValidators();
        this.realEstateForm.get('months')?.updateValueAndValidity();
      } else {
        this.realEstateForm.get('months')?.setValidators(Validators.required);
        this.realEstateForm.get('months')?.updateValueAndValidity();
      }
    });

    // استدعاء API لجلب العملات
    this.getCurrencies().subscribe((currencies: any[]) => {
      // تعيين العملات المحددة
      this.currencies = currencies.filter((currency) =>
        [1, 2, 3].includes(currency.id)
      );

      const defaultCurrency = this.currencies.find(
        (currency) => currency.id === 1
      );
      if (defaultCurrency) {
        this.realEstateForm.get('currency_id')?.setValue(defaultCurrency.id);
      }
    });
  }

  getCurrencies(): Observable<any[]> {
    const url = `${this.apiUrl}/settings/getCurrencies`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(url, { headers });
  }

  onFileChange(event: any) {
    this.photos = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    console.log(this.realEstateForm.value, 'this.realEstateForm');

    Object.keys(this.realEstateForm.value).forEach((key) => {
      if (key !== 'photos') {
        formData.append(key, this.realEstateForm.value[key]);
      }
    });

    if (this.photos && this.photos.length > 0) {
      this.photos.forEach((photo: File) => {
        formData.append('photos[]', photo);
      });
    }

    this.addRealEstate(formData).subscribe(
      (response) => {
        console.log('Success!', response);

        const newRealEstateId = response.data.id;
        this.router.navigate(['/viewrealestate', newRealEstateId]);
      },
      (error) => {
        console.error('Error!', error);
      }
    );
  }

  addRealEstate(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
