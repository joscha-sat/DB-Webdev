import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserHttpService } from '../../services/user-http.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(public loginService: UserHttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  loggedIn = false;

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

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // Navigations-Icon-toggle
  @ViewChild('navlinks') links: ElementRef;

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    // Initialwert setzen für den Status loggedIn
    this.getIsLoggedIn();

    // Initialwert für den User setzen
    this.getLoggedInUser();

    // auf Veränderungen des Users reagieren
    this.loginService.updater$.subscribe(() => {
      this.getIsLoggedIn();
      this.getLoggedInUser();
    });
  }
}
