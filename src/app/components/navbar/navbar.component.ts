import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor() {}

  // Navigations-Icon-toggle
  @ViewChild('navlinks') links: ElementRef;

  @ViewChild('nav') nav: ElementRef;

  navBarItems(): void {
    this.links.nativeElement.classList.toggle('is-active');
  }
}
