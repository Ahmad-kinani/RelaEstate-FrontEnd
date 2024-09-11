import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private apiUrl = 'http://localhost:8000/api/realEstate/';

  constructor(private http: HttpClient) {}

  getRealEstateById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
