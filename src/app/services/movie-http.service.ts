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

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:3000/getMovies');
  }

  getOneMovie(movie_id: number): Observable<Movie> {
    return this.http.get<Movie>(
      'http://localhost:3000/getOneMovie/' + movie_id
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    const movie_data = new FormData();

    movie_data.append('duration', String(movie.duration));
    movie_data.append('title', movie.title);
    movie_data.append('release_year', String(movie.release_year));
    movie_data.append('fsk', String(movie.fsk));
    movie_data.append('genre', movie.genre);
    movie_data.append('image', movie.image, movie.title);
    movie_data.append('description', movie.description);
    movie_data.append('trailer', movie.trailer);

    return this.http
      .post<Movie>('http://localhost:3000/addMovie', movie_data)
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

  updateMovie(update_Movie: Movie): any {
    let movie_daten: Movie | FormData;

    if (typeof update_Movie.image === 'object') {
      movie_daten = new FormData();

      movie_daten.append('movie_id', String(update_Movie.movie_id));
      movie_daten.append('duration', String(update_Movie.duration));
      movie_daten.append('title', update_Movie.title);
      movie_daten.append('release_year', String(update_Movie.release_year));
      movie_daten.append('fsk', String(update_Movie.fsk));
      movie_daten.append('genre', update_Movie.genre);
      movie_daten.append('image', update_Movie.image, update_Movie.title);
      movie_daten.append('trailer', update_Movie.trailer);
      movie_daten.append('description', update_Movie.description);
    } else {
      movie_daten = update_Movie;
    }

    return this.http
      .patch(
        `http://localhost:3000/updateMovie/'${update_Movie.movie_id}'`,
        movie_daten
      )
      .pipe(
        tap(() => {
          this._updater$.next();
        })
      );
  }
}
