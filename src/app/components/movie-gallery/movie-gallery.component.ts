import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';
import { MovieHttpService } from 'src/app/services/movie-http.service';
import { UserHttpService } from '../../services/user-http.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss']
})
export class MovieGalleryComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private suchenService: ArrayFilterService,
    private httpService: MovieHttpService,
    private httpU: UserHttpService
  ) {
  }

  // ------------------------------------------------------------------------- || Variables + Objects ||
  genreFilteredMovies: Movie[] = [];

  isAdmin = false;

  // ------------------------------------------------------------------------------------- || Methods ||

  getIsAdmin(): void {
    this.isAdmin = this.httpU.getIsAdmin();
  }

  filteredFilme(): Movie[] {
    return this.suchenService.filteredFilmTitel(this.array, this.search);
  }

  genreFilteredFilme(genre: string) {

    this.httpService.getMoviesByGenre(genre).subscribe((film) => {

      this.genreFilteredMovies = film;
    });
  }

  resetGenres():void {
    this.genreFilteredMovies=[];
  }
  // ------------------------------------------------------------------------------------- || @Inputs ||

  @Input() search: string = '';

  @Input() array: [];

  deleteMovie(id: number): void {
    this.httpService.deleteOneMovie(id).subscribe();
  };

  // ------------------------------------------------------------------------------------ || ngOnInit ||
  ngOnInit(): void {
    // Initialwerte
    this.getIsAdmin();

    // auf Veränderungen des Users reagieren
    this.httpU.updater$.subscribe(() => {
      this.getIsAdmin();
    });
  };
}
