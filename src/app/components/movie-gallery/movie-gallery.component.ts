import { Component, Input } from '@angular/core';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent {
  constructor(private suchenService: ArrayFilterService) {}

  // Suchen und gefilterte Filme
  @Input() search: string = '';

  @Input() array: [];

  filteredFilme(): string[] {
    return this.suchenService.filteredFilmTitel(this.array, this.search);
  }
}
