import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AddrealestateComponent } from './addrealestate/addrealestate.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdminGuard } from './admin.guard.service';
import { AppComponent } from './app.component';

import { MatListModule } from '@angular/material/list';
import { EditeComponent } from './edite/edite.component';
import { EditRealEstateComponent } from './editrealestate/editrealestate.component';
import { FavoriteDialogComponent } from './favorite-dialog/favorite-dialog.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ListingComponent } from './listing/listing.component';
import { ListinvoiceComponent } from './listinvoice/listinvoice.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RentingOutComponent } from './renting-out/renting-out.component';
import { UsersComponent } from './users/users.component';
import { ViewaddComponent } from './viewadd/viewadd.component';
import { ViewinvoiceComponent } from './viewinvoice/viewinvoice.component';
import { ViewRealEstateComponent } from './viewrealestate/viewrealestate.component';

const routes: Routes = [
  { path: 'listing', component: ListingComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'viewinvoice', component: ViewinvoiceComponent },
  { path: 'addrealestate', component: AddrealestateComponent },
  { path: 'viewrealestate/:id', component: ViewRealEstateComponent },
  { path: 'editrealestate/:id', component: EditRealEstateComponent },
  { path: 'listinvice', component: ListinvoiceComponent },
  { path: 'edite', component: EditeComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'viewadd', component: ViewaddComponent },
  { path: 'home', component: HomeComponent },
  { path: 'renting-out', component: RentingOutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingComponent,
    RentingOutComponent,
    GalleryComponent,
    LoginComponent,

    RegisterComponent,
    FavoriteDialogComponent,

    UsersComponent,
    AdduserComponent,
    ViewaddComponent,
    EditeComponent,
    AddrealestateComponent,
    ViewRealEstateComponent,
    EditRealEstateComponent,
    InvoiceComponent,
    ViewinvoiceComponent,
    ListinvoiceComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatOptionModule,
    MatListModule,

    RouterModule.forRoot(routes),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
