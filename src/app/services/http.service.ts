import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kunde } from '../interfaces/kunde';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>('http://localhost:3000/getUser');
  }
}
