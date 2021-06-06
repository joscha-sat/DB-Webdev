import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserHttpService } from '../services/user-http.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: UserHttpService, private router: Router) {}

  canActivate(
    //return true = Url zugägnlich, flase = Url nicht zugänglich
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import('@angular/router').UrlTree
    | import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
    | Promise<boolean | import('@angular/router').UrlTree> {
    const isLoggedIn = this.authService.getIsLoggedIn(); // wir setzen true / false abhängig, ob der User Authentifiziert ist über den AuthService

    if (!isLoggedIn) {
      this.router.navigate(['/Login']);
    }

    return isLoggedIn;
  }
}
