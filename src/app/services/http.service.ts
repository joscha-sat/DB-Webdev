import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from '../interfaces/kunde';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // ------------------------------------------------------------------------------------- || Methods ||

  getUsers(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>('http://localhost:3000/getUser');
  }

  addUser(user: Kunde): Observable<Kunde> {
    return this.http.post<Kunde>(
      'http://localhost:3000/addUser',
      { user },
      this.httpOptions
    );
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||
}
