import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class ArrayFilterService {
  filteredFilmTitel(array: Array<any>, search: string): Array<Movie> {
    if (!search) {
      return array;
    }
    if (!array) {
      return;
    }
    return array.filter((filme: any) => {
      return filme.title.toLowerCase().match(search.toLowerCase());
    });
  }
}
