import { Component } from '@angular/core';
import { ArrayFilterService } from 'src/app/Services/array-filter.service';

// Interfaces
import { Film } from 'src/app/Interfaces/film';

@Component({
  selector: 'app-movie-gallery',
  templateUrl: './movie-gallery.component.html',
  styleUrls: ['./movie-gallery.component.scss'],
})
export class MovieGalleryComponent {
  constructor(private suchenService: ArrayFilterService) {}

  filme: Film[] = [
    {
      filmId: 1,
      erscheinungsjahr: 2014,
      altersfreigabe: 18,

      bild:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexlibris.azureedge.net%2Fcovers%2F5050%2F5827%2F0699%2F4%2F5050582706994xxl.jpg&f=1&nofb=1',
      genre: 'Action',
      titel: 'Fast & Furious',
      dauer: '1h 48min',
    },
    {
      filmId: 2,
      erscheinungsjahr: 2014,
      altersfreigabe: 18,

      bild:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.suggestingmovie.com%2FMovies%2F6221-lci.jpg&f=1&nofb=1',
      genre: 'Action',
      titel: 'Snowden',
      dauer: '1h 48min',
    },
    {
      filmId: 3,
      erscheinungsjahr: 2014,
      altersfreigabe: 18,

      bild:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.moviemeter.nl%2Fimages%2Fcover%2F83000%2F83317.jpg%3Fcb%3D1370758670&f=1&nofb=1',
      genre: 'Action',
      titel: 'Django',
      dauer: '1h 48min',
    },
    {
      filmId: 4,
      erscheinungsjahr: 2014,
      altersfreigabe: 18,

      bild:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.coverwhiz.com%2Fcontent%2FHarry-Potter-And-The-Deathly-Hallows-Part-1.jpg&f=1&nofb=1',
      genre: 'Action',
      titel: 'Harry Potter',
      dauer: '1h 48min',
    },
  ];

  // Suchen und gefilterte Filme
  search: string = '';

  filteredFilme(): string[] {
    return this.suchenService.filteredFilmTitel(this.filme, this.search);
  }
}
