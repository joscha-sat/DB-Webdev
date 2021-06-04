import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';
import { MovieHttpService } from 'src/app/services/movie-http.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private suchenService: ArrayFilterService,
    private httpService: MovieHttpService
  ) {}
  // ------------------------------------------------------------------------- || Variables + Objects ||

  // ------------------------------------------------------------------------------------- || Methods ||

  filteredFilme(): Movie[] {
    return this.suchenService.filteredFilmTitel(this.array, this.search);
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  @Input() search: string = '';

  @Input() array: [];

  deleteMovie(id: number): void {
    this.httpService.deleteOneMovie(id).subscribe();
  }
}
