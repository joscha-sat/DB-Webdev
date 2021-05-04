import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayFilterService {
  filteredFilmTitel(array: Array<any>, search: string): Array<any> {
    return array.filter((filme) => {
      return filme.titel.toLowerCase().match(search.toLowerCase());
    });
  }
}
