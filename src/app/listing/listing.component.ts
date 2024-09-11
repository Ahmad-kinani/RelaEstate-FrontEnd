import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { FavoriteDialogComponent } from '../favorite-dialog/favorite-dialog.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  private apiUrl: string;
  cards: any[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.apiUrl = this.configService.getApiUrl();
  }

  getCards(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(`${this.apiUrl}/api/realEstate`, { headers });
  }
  ngOnInit(): void {
    this.getCards().subscribe(
      (response) => {
        if (response.data && Array.isArray(response.data)) {
          this.cards = response.data.map((card: any) => {
            if (Array.isArray(card.photos) && card.photos.length > 0) {
              card.image = card.photos[0].photo;
            } else {
              card.image = '/assets/ssss.jpg';
            }
            return card;
          });
        } else {
          console.error(
            'Data format is not as expected or data is empty',
            response
          );
        }
      },
      (error) => {
        console.error('Error fetching real estate data:', error);
      }
    );
  }

  toggleFavorite(card: any, event: Event): void {
    event.stopPropagation();
    if (!Array.isArray(card.favorite)) {
      card.favorite = [];
    }

    if (card.favorite.length) {
      this.removeFavorite(card.id).subscribe(
        () => {
          console.log('Removed from favorites');
          card.favorite = [];
          this.openDialog();
        },
        (error) => {
          console.error('Error removing from favorites:', error);
          card.favorite = [1];
        }
      );
    } else {
      this.addFavorite(card.id).subscribe(
        () => {
          console.log('Added to favorites');
          card.favorite = [1];
          this.openDialog();
        },
        (error) => {
          console.error('Error adding to favorites:', error);

          card.favorite = [];
        }
      );
    }
  }

  openDialog(): void {
    this.dialog.open(FavoriteDialogComponent, {
      width: '500px',
    });
  }
  addFavorite(realEstateId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = { real_estate_id: realEstateId };
    return this.http.post(`${this.apiUrl}/api/favorite`, body, { headers });
  }

  removeFavorite(realEstateId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const params = new HttpParams().set(
      'real_estate_id',
      realEstateId.toString()
    );

    return this.http.delete(`${this.apiUrl}/api/favorite/delete`, {
      headers,
      params,
    });
  }

  navigateToDetail(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/viewrealestate', id]);
    } else {
      console.error('Invalid card ID');
    }
  }

  navigateToFatora(card: any, event: Event): void {
    event.stopPropagation();

    if (card.id !== undefined) {
      const type =
        card.status === 'to sale'
          ? 'Buy'
          : card.status === 'to rent'
          ? 'Rent'
          : '';
      if (type) {
        this.router.navigate(['/invoice'], {
          queryParams: { type: type, real_estate_id: card.id },
        });
      } else {
        console.error('Invalid card status');
      }
    } else {
      console.error('Invalid card ID');
    }
  }
}
