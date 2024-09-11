import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfigService } from '../config.service';

export interface UserData {
  id: string;
  username: string;
  type: string;
  status: string;
  phone: string;
  id_number: string;
  gender: string;
  email: string;
  photo: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'username',
    'type',
    'status',
    'phone',
    'id_number',
    'gender',
    'email',
    'photo',
  ];
  dataSource: MatTableDataSource<UserData>;
  private apiUrl: string;
  total: number = 0;
  page?: number = 0;
  page_size: number = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef
  ) {
    this.apiUrl = this.configService.getApiUrl();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changePagination(event: PageEvent) {
    console.log(event, 'Page event');
    this.page = event.pageIndex + 1; // API pages are 1-based
    this.page_size = event.pageSize;
    this.getData();
  }

  getData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    console.log([this.page, this.page_size], 'Params for users API call');
    this.http
      .get<{
        data: UserData[];
        meta: {
          current_page: any;
          total: any;
        };
      }>(
        `${this.apiUrl}/api/users?page=${this.page}&perPage=${this.page_size}`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response, 'Response from users API');
          this.total = response.meta.total;
          this.dataSource.data = response.data;
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );
  }

  navigateToViewAdd(row: UserData) {
    this.router.navigate(['/viewadd'], { queryParams: { id: row.id } });
  }
}
