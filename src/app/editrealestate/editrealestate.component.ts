import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-editrealestate',
  templateUrl: './editrealestate.component.html',
  styleUrls: ['./editrealestate.component.css'],
})
export class EditRealEstateComponent implements OnInit {
  realEstateForm!: FormGroup;
  statusOptions = ['to sale', 'to rent', 'sold', 'rented'];
  private apiUrl: string;
  photos: any[] = [];
  selectedStatus: string = '';
  realEstateId: string;
  deletePhotos: any[] = [];
  currencies = [
    { id: 1, name: 'Syrian Pound', symbol: 'SYP' },
    { id: 2, name: 'US Dollar', symbol: 'USD' },
    { id: 3, name: 'Euro', symbol: 'EUR' },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.realEstateId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadRealEstate();

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
  }

  initializeForm() {
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
      months: 0,
      currency: [Validators.required],
      photos: [null],
      currency_id: null,
      id: null,
      images: this.fb.array([]),
    });
  }

  loadRealEstate() {
    if (this.realEstateId) {
      const token = localStorage.getItem('token');

      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        this.http
          .get<any>(`${this.apiUrl}/api/realEstate/${this.realEstateId}`, {
            headers,
          })
          .subscribe(
            (response) => {
              const realEstate = response.data;
              this.realEstateForm.patchValue(realEstate);
              this.photos = realEstate.photos || [];
              this.realEstateForm
                .get('currency')
                ?.setValue(realEstate.currency.id);
              this.photos = realEstate.photos || [];

              console.log(response.data, 'response.data');
            },
            (error) => {
              console.error('Error fetching real estate data', error);
            }
          );
      } else {
        console.error('No token found in local storage.');
      }
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          (this.realEstateForm.get('images') as FormArray).push(
            this.fb.control({ file: file, url: e.target.result })
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }
  removePhoto(photo: any) {
    this.photos = this.photos.filter((p) => p.id !== photo.id);

    if (photo) {
      this.deletePhotos.push(photo);
    }
    console.log(this.deletePhotos, 'this.deletePhotos');
  }

  onSubmit() {
    const formData = new FormData();

    Object.keys(this.realEstateForm.value).forEach((key) => {
      if (key !== 'photos' && key !== 'images') {
        formData.append(key, this.realEstateForm.value[key]);
      }
    });

    const images = this.realEstateForm.get('images')?.value;

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        console.log(images[i], 'images[i');
        formData.append('images[]', images[i].file);
      }
    }

    this.deletePhotos.forEach((photo) => {
      console.log(photo, 'myphoto');
      formData.append('deletePhotos', photo.id);
    });

    this.updateRealEstate(formData).subscribe(
      (response) => {
        console.log('Update Success!', response);
        this.router.navigate(['/viewrealestate', this.realEstateId]);
      },
      (error) => {
        console.error('Update Error!', error);
      }
    );
  }

  updateRealEstate(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // const formDataEntries: any = {};
    // data.forEach((value, key) => {
    //   if (formDataEntries[key]) {
    //     if (Array.isArray(formDataEntries[key])) {
    //       formDataEntries[key].push(value);
    //     } else {
    //       formDataEntries[key] = [formDataEntries[key], value];
    //     }
    //   } else {
    //     formDataEntries[key] = value;
    //   }
    // });

    // console.log('FormData content:', formDataEntries);
    this.realEstateForm
      .get('currency_id')
      ?.setValue(this.realEstateForm.get('currency')?.value);
    console.log(this.realEstateForm.value, 'realEstateForm');
    return this.http.put<any>(
      `${this.apiUrl}/api/realEstate/${this.realEstateId}`,
      this.realEstateForm.value,

      {
        headers,
      }
    );
  }
}
