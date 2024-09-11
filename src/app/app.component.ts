import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0s ease-in', style({ transform: 'translateX(-400%)' })),
      ]),
      transition(':leave', [
        animate('30s ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Market';
  isHomePage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.isHomePage =
          event.urlAfterRedirects === '/home' ||
          event.urlAfterRedirects === '/';
      });
  }

  background_images = [
    { id: 2, src: '/assets/gallery/ahmad1.webp', alt: 'Image 2' },
    { id: 5, src: '/assets/gallery/ahmad2.jpg', alt: 'Image 5' },
    { id: 4, src: '/assets/gallery/ahmad3.jpg', alt: 'Image 4' },
    { id: 3, src: '/assets/gallery/ahmad4.jpeg', alt: 'Image 3' },
    { id: 1, src: '/assets/gallery/ahmad5.jpg', alt: 'Image 1' },
    // Add more images as needed
  ];
}
