import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient, private router: Router) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  isAuthenticated: boolean = false;

  isAdmin: boolean = false;

  token: string | any;

  userid: string | any;

  tokenTimer: any;

  user: User | any;

  hashedPassword: string;

  url: string = 'http://localhost:3000';

  private _updater$: Subject<void> = new Subject<void>();

  // ------------------------------------------------------------------------------------- || Getters ||

  get updater$(): Subject<void> {
    return this._updater$;
  }

  getIsLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getUser(): User {
    return this.user;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/getUsers');
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  // || REGISTRIEREN || --------------------------------------------------------------------------------------------------------------------------- //

  registerUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', { newUser });
  }

  // Get User by Number
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/getUserById/' + id);
  }

  // || LOGIN || --------------------------------------------------------------------------------------------------------------------------- //

  loginUser(email: string, password: string): void {
    const loginData = {
      email: email,
      password: password,
    };

    this.http
      .post<any>(this.url + '/login', { loginData })
      .subscribe((response) => {
        this.token = response.token;

        if (this.token) {
          const expiresInDuration = response.expiresIn;

          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;

          this.user = response.user;

          if (this.user.isAdmin === 'true') {
            this.isAdmin = true;
          }

          const now = new Date(); //Timestamp des Moments
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000 // aktuelle Zeit + 1h bis sich Token auflöst
          );

          this._updater$.next();

          this.saveAuthData(this.token, expirationDate, this.userid, this.user);

          this.router.navigate(['/Startseite']);
        }
      });
  }

  // || LOGOUT || --------------------------------------------------------------------------------------------------------------------------- //

  logoutUser(): void {
    this.token = null;

    this.isAuthenticated = false;

    this.isAdmin = false;

    this._updater$.next();

    this.userid = null;

    this.user = null;

    this.hashedPassword = null;

    clearTimeout(this.tokenTimer); // setzt den Timer nach Logout zurück

    this.clearAuthData(); // Daten aus dem lokalen Speicher löschen

    this.router.navigate(['/Login']);
  }
  // UPDATE USER ||--------------------------------------------------------------------------------------------------------------------------------------------//

  updateUser(update_User: User): Observable<User> {
    if (update_User.user_id != this.user.user_id) {
      console.log(
        'Error: Sie versuchen jmd anderes als Ihren Account zu bearbeiten!'
      );
      return;
    } else {
      return this.http
        .patch<User>(
          this.url + '/updateUser/' + update_User.user_id,
          update_User
        )
        .pipe(
          tap(() => {
            if (update_User.password.length >= 6) {
              this.user = update_User;
              localStorage.setItem('user', JSON.stringify(this.user));
            } else {
              const updatedUser = {
                user_id: this.user.user_id,
                date_of_birth: this.user.date_of_birth,
                password: this.user.password,
                email: update_User.email,
                name: update_User.name,
                isAdmin: this.user.isAdmin,
              };
              localStorage.setItem('user', JSON.stringify(updatedUser));

              this.user = JSON.parse(localStorage.getItem('user'));
            }
            this._updater$.next();
          })
        );
    }
  }
  // || LOCALSTORAGE + ANGEMELDET BLEIBEN NACH RELOAD || --------------------------------------------------------------------------------------------------------------------------- //

  autoAuthUser(): void {
    // prüfen, ob der localStorage Daten zum Login gespeichert hat

    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    // Falls ja, dann entspechende token & variablen setzen / aktualisieren

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    // prüfen, ob die aktuelle Zeit vor oder nach der gespeicherten expirationdate ist (Zeitraum 1h)
    if (expiresIn > 0) {
      // wenn die Zeit noch nicht abgelaufen ist, dann für authentifiziert erklären
      this.token = authInformation.token;

      this.isAuthenticated = true;

      if (authInformation.user.isAdmin === 'true') {
        this.isAdmin = true;
      }

      this.userid = authInformation.userid;

      this.setAuthTimer(expiresIn / 1000);

      this._updater$.next();
    }
  }

  // im localStorage speichern, damit man z.B. nach einem reload der Seite weiterhin eingeloggt ist und Daten abrufen kann.  ------------------ //

  saveAuthData(
    token: string,
    expirationDate: Date,
    userid: string,
    user: User
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userid', userid);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userid');
    localStorage.removeItem('user');
  }

  getAuthData(): {
    token: string;
    userid: string;
    expirationDate: Date;
    user: User;
  } {
    const token = localStorage.getItem('token');

    const expirationDate = localStorage.getItem('expiration');

    const userid = localStorage.getItem('userid');

    const user = JSON.parse(localStorage.getItem('user'));

    if (!token && !expirationDate && !user) {
      return;
    }

    this.user = user; // um mit getUser die Daten in Components nutzen zu können

    return {
      token: token,
      userid: userid,
      expirationDate: new Date(expirationDate),
      user: user,
    };
  }

  setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      //timer in Millisekunden, daher mal 1000
      this.logoutUser();
    }, duration * 1000);
  }
}
