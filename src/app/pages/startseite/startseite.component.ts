import { Component } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { FilmHttpService } from 'src/app/services/film-http.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss'],
})
export class StartseiteComponent {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(private http: FilmHttpService) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  filme: Movie[];

  search: string = '';

  // ------------------------------------------------------------------------------------- || Methods ||

  getAllMovies(): void {
    this.http.getMovies().subscribe((film) => (this.filme = film));
  }

  // ------------------------------------------------------------------------------------- || @Inputs ||

  // ---------------------------------------------------------------------------------- || @ViewChild ||

  // ------------------------------------------------------------------------------------ || ngOnInit ||

  ngOnInit(): void {
    this.http.updater$.subscribe(() => {
      this.getAllMovies();
    });

    this.getAllMovies();
  }
}
