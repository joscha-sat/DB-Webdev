import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Film } from '../Interfaces/film';

@Injectable({
  providedIn: 'root',
})
export class FilmHttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  private _updater$ = new Subject<void>();

  get updater$(): Subject<void> {
    return this._updater$;
  }

  // ------------------------------------------------------------------------------------- || Methods ||

  uploadImage(image: File): void {
    const uploadImageData = new FormData();
    uploadImageData.append('myFile', image);

    this.http
      .post('http://localhost:3000/uploadImage', uploadImageData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        console.log(event);
      });
  }

  getMovies(): Observable<Film[]> {
    return this.http.get<Film[]>('http://localhost:3000/getMovies');
  }

  addMovie(movie: Film): Observable<Film> {
    return this.http
      .post<Film>('http://localhost:3000/addMovie', { movie })
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }

  deleteOneMovie(id: number): Observable<Film> {
    return this.http
      .delete<Film>('http://localhost:3000/deleteOneMovie/' + id)
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }
}
