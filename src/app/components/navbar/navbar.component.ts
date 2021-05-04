import { DarkmodeService } from './../../Services/darkmode.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private darkmodeService: DarkmodeService) {}

  // Navigations-Icon-toggle
  @ViewChild('navlinks') links: ElementRef;
  @ViewChild('nav') nav: ElementRef;

  navBarItems(): void {
    this.links.nativeElement.classList.toggle('is-active');
  }

  // Darkmode-toggle
  toggleTheme(): void {
    this.darkmodeService.darkModeToggleF();

    this.nav.nativeElement.classList.toggle('is-dark');
    this.nav.nativeElement.classList.toggle('is-light');
  }

  darkMode: string | null = localStorage.getItem('darkMode');

  //Init
  ngAfterViewInit(): void {
    if (this.darkMode === 'enabled') {
      this.nav.nativeElement.classList.add('is-light');
    } else {
      this.nav.nativeElement.classList.add('is-dark');
    }
  }
}
