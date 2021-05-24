import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Kunde } from '../interfaces/kunde';

@Injectable({
  providedIn: 'root',
})
export class KundeHttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  private _updater$ = new Subject<void>();

  get updater$(): Subject<void> {
    return this._updater$;
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  getUsers(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>('http://localhost:3000/getUser');
  }

  addUser(user: Kunde): Observable<Kunde> {
    return this.http
      .post<Kunde>('http://localhost:3000/addUser', { user })
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }
}
