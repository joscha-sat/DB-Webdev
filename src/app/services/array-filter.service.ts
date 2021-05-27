import { Injectable } from '@angular/core';
import { Film } from '../Interfaces/film';

@Injectable({
  providedIn: 'root',
})
export class ArrayFilterService {
  filteredFilmTitel(array: Array<any>, search: string): Array<Film> {
    return array.filter((filme: any) => {
      return filme.titel.toLowerCase().match(search.toLowerCase());
    });
  }
}
