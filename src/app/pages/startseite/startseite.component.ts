import { ArrayFilterService } from './../../services/array-filter.service';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/Interfaces/film';
import { FilmHttpService } from 'src/app/services/film-http.service';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.scss'],
})
export class StartseiteComponent implements OnInit {
  // --------------------------------------------------------------------------------- || Constructor ||
  constructor(
    private suchenService: ArrayFilterService,
    private http: FilmHttpService
  ) {}

  // ------------------------------------------------------------------------- || Variables + Objects ||

  filme: Film[];

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
