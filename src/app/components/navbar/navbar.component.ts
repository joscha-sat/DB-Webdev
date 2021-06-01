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
export class NavbarComponent implements OnInit, OnDestroy {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(public loginService: UserHttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  loggedIn = false;

  private loginStatusSub: Subscription;

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
    console.log(this.user);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // Navigations-Icon-toggle
  @ViewChild('navlinks') links: ElementRef;

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    this.loggedIn = this.loginService.getIsLoggedIn();
    this.loginStatusSub = this.loginService
      .getLoginStatusListener()
      .subscribe((login) => {
        this.loggedIn = login;
      });

    this.loginService.updater$.subscribe(() => {
      this.getLoggedInUser();
    });
    this.getLoggedInUser();
  }

  ngOnDestroy(): void {
    this.loginStatusSub.unsubscribe();
  }
}
