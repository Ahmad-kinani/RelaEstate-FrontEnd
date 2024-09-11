import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
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
export class GalleryComponent {
  background_images = [
    { id: 2, src: '/assets/gallery/ahmad1.webp', alt: 'Image 2' },
    { id: 5, src: '/assets/gallery/ahmad2.jpg', alt: 'Image 5' },
    { id: 4, src: '/assets/gallery/ahmad3.jpg', alt: 'Image 4' },
    { id: 3, src: '/assets/gallery/ahmad4.jpeg', alt: 'Image 3' },
    { id: 1, src: '/assets/gallery/ahmad5.jpg', alt: 'Image 1' },
    // Add more images as needed
  ];
}
