import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient, private router: Router) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  isAuthenticated = false;

  token: string | any;

  email: string | any;

  userid: string | any;

  tokenTimer: any;

  authStatusListener = new Subject<boolean>();

  user: User | any;

  url = 'http://localhost:3000';

  private _updater$ = new Subject<void>();



  // ------------------------------------------------------------------------------------- || Getters ||

  get updater$(): Subject<void> {
    return this._updater$;
  }

  getIsLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getLoginStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getToken(): any {
    return this.token;
  }

  getUser(): User {
    return this.user;
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/getUsers');
  }

  registerUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.url + '/register', { newUser });
  }

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
          console.log(this.getUser());
          const now = new Date(); //Timestamp des Moments
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          ); // aktuelle Zeit + 1h bis Token auslöuft
          this.authStatusListener.next(true);
          this._updater$.next();
          this.saveAuthData(this.token, email, expirationDate, this.userid);
          this.router.navigate(['/Startseite']);
        }
      });
  }

  logoutUser(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false); // andere informieren
    this.userid = null;
    clearTimeout(this.tokenTimer); // setzt den Timer nach Logout zurück
    this.clearAuthData(); // Daten aus dem lokalen Speicher löschen
    this.router.navigate(['/Login']);
  }

  autoAuthUser(): void {
    // User wird automatisch authorisiert, sofern der Token & expriationDate & Name im lokalen Speicher sind
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime(); // prüfen, ob die aktuelle Zeit vor oder nach der gespeicherten expirationdate ist (Zeitraum 1h)
    if (expiresIn > 0) {
      // wenn die Zeit noch nicht abgelaufen ist, dann für authentifiziert erklären
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userid = authInformation.userid; //sd
      this.email = authInformation.email;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // lokal speichern, damit man z:b. nach einem reload der Seite weiterhin eingeloggt ist. + weitere Methoden dazu ------------------ //

  saveAuthData(
    token: string,
    email: string,
    expirationDate: Date,
    userid: string
  ): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email', email);
    localStorage.setItem('userid', userid);
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
    localStorage.removeItem('userid');
  }

  getAuthData(): {
    token: string;
    email: string;
    userid: string;
    expirationDate: Date;
  } {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const email = localStorage.getItem('email');
    const userid = localStorage.getItem('userid');

    if (!token && !expirationDate && !email) {
      return;
    }

    return {
      token: token,
      email: email,
      userid: userid,
      expirationDate: new Date(expirationDate),
    };
  }

  setAuthTimer(duration: number): void {
    console.log('Timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      //timer in Millisekunden, daher mal 1000
      this.logoutUser();
    }, duration * 1000);
  }
}
