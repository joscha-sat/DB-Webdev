import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Movie } from '../interfaces/movie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieHttpService {
  // --------------------------------------------------------------------------------- || Constructor ||

  constructor(private http: HttpClient, private router: Router) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  movie: Movie;

  movie_id: number;

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

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/getMovies');
  }

  getOneMovie(movie_id: number): Observable<Movie> {
    return this.http.get<Movie>(
      'http://localhost:3000/getOneMovie/' + movie_id
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>('http://localhost:3000/addMovie', { movie })
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }

  deleteOneMovie(id: number): Observable<Movie> {
    return this.http
      .delete<Movie>('http://localhost:3000/deleteOneMovie/' + id)
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }
}
