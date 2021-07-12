import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';

import { User } from '../../interfaces/user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(public loginService: UserHttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  loggedIn = false;

  isAdmin = false;

  user: User;

  // ------------------------------------------------------------------------------------- || Methods ||

  logout(): void {
    this.loginService.logoutUser();
  }

  navBarItems(): void {
    this.links.nativeElement.classList.toggle('is-active');
  }

  getLoggedInUser(): void {
    this.user = this.loginService.getUser();
  }

  getIsLoggedIn(): void {
    this.loggedIn = this.loginService.getIsLoggedIn();
  }

  getIsAdmin(): void {
    this.isAdmin = this.loginService.getIsAdmin();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // Navigations-Icon-toggle
  @ViewChild('navlinks') links: ElementRef;

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    // Initialwerte
    this.getIsLoggedIn();
    this.getIsAdmin();
    this.getLoggedInUser();

    // auf Veränderungen des Users reagieren
    this.loginService.updater$.subscribe(() => {
      this.getIsLoggedIn();
      this.getIsAdmin();
      this.getLoggedInUser();
    });
  }
}
