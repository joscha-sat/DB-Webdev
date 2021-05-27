import { Component, Input } from '@angular/core';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';
import { FilmHttpService } from 'src/app/services/film-http.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private suchenService: ArrayFilterService,
    private httpService: FilmHttpService
  ) {}
  // ------------------------------------------------------------------------- || Variables + Objects ||

  // ------------------------------------------------------------------------------------- || Methods ||

  filteredFilme(): string[] {
    return this.suchenService.filteredFilmTitel(this.array, this.search);
  }

  deleteOneMovie(id: number): void {
    this.httpService.deleteOneMovie(id).subscribe();
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  @Input() search: string = '';

  @Input() array: [];
}
