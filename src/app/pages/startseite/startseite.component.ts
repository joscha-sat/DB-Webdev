import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieHttpService } from 'src/app/services/movie-http.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss'],
})
export class StartseiteComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private http: MovieHttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  filme: Movie[];

  search: string = '';

  genre: string;

  // ------------------------------------------------------------------------------------- || Methods ||

  getAllMovies(): void {
    this.http.getMovies().subscribe((film) => (this.filme = film));
  }

  genreFilteredFilme(genre: string): void {
    if (!genre) {
      return;
    }

    this.genre = genre;

    this.http.getMoviesByGenre(genre).subscribe((film) => {
      this.filme = film;
    });
  }

  resetGenres(): void {
    this.filme = [];
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    this.http.updater$.subscribe(() => {
      this.getAllMovies();
    });

    this.genreFilteredFilme('Alle Filme');
  }
}
